const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const secret = require("./secrets");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");

app.use(express.static("./public"));
app.use(compression());
app.use(express.json());

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(
    cookieSession({
        secret: secret.cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//name it with the json extention to avoid conflict with the client rendering page
app.get("/user.json", async (req, res) => {
    try {
        let userInfo = await db.getUserInfo(req.session.userId);
        res.json({
            userInfo: userInfo.rows[0]
        });
    } catch (e) {
        console.log("Error on the get user info: ", e);
    }
});

app.get("/user.json/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;
    if (id != userId) {
        try {
            let { rows } = await db.getUserInfo(id);
            res.json({
                otherUser: rows[0],
                success: true
            });
        } catch (error) {
            console.log("Error on the get user/:id route: ", error);
        }
    } else {
        res.json({
            success: false
        });
    }
});

app.get("/api/users/", async (req, res) => {
    try {
        let { rows } = await db.getNewUsers();
        res.json(rows);
    } catch (error) {
        console.log("Error on the get more users: ", error);
    }
});

app.get("/api/find-users/:val", async (req, res) => {
    const { val } = req.params;
    try {
        let { rows } = await db.searchUsers(val);
        res.json(rows);
    } catch (err) {
        console.log("Error on the seacrh users route: ", err);
    }
});

// new route to get friendship relationship
app.get("/friend-status/:otherId", async (req, res) => {
    const { otherId } = req.params;
    const { userId } = req.session;
    //console.log("otherId: ", otherId);
    //console.log("userId: ", userId);

    try {
        let { rows } = await db.friendStatus(otherId, userId);

        //console.log("sender: ", rows[0].sender_id);
        if (rows.length == 0) {
            res.json("Make Friend request");
        } else if (rows[0].sender_id == otherId && !rows[0].accepted) {
            res.json("Accept Friendship");
        } else if (!rows[0].accepted) {
            res.json("Cancel Friends Request");
        } else {
            res.json("end friendship");
        }
    } catch (err) {
        console.log("Error on the friends status route: ", err);
    }
});

app.post("/friend-status", async (req, res) => {
    const { otherId } = req.body;
    const { userId } = req.session;
    const { buttonText } = req.body;

    //console.log("buttonText", buttonText);

    try {
        if (buttonText == "Make Friend request") {
            await db.friendRequest(otherId, userId);
            return res.json("Cancel Friends Request");
        }

        if (buttonText == "Accept Friendship") {
            await db.upDateFriendRequest(otherId, userId);
            return res.json("end friendship");
        }

        if (buttonText == "end friendship" || "cancel friend request") {
            await db.deleteFriendRequest(otherId, userId);
            return res.json("Make Friend request");
        }
    } catch (err) {
        console.log("Error on the request friendship route: ", err);
    }

    //console.log("otherId: ", otherId);
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let { rows } = await db.getUser(email);
        if (rows.length === 0) {
            return res.json({
                success: false
            });
        }

        let comaparePw = await compare(password, rows[0].password);
        if (!comaparePw) {
            return res.json({
                success: false
            });
        }

        req.session.userId = rows[0].id;
        res.json({
            success: true
        });
    } catch (err) {
        console.log("Error on the login route: ", err);
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;
    const inputSize = Object.keys(req.body).length;

    if (inputSize < 4) {
        return res.json(false);
    }
    try {
        let hashedpwd = await hash(password);
        let id = await db.addUser(first, last, email, hashedpwd);

        req.session.userId = id.rows[0].id;
        res.json(true);
    } catch (err) {
        console.log("error on the post registration: ", err);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    try {
        await db.updateImage(imageUrl, req.session.userId);
        res.json({
            image: imageUrl
        });
    } catch (e) {
        console.log("Error on the /upload route; ", e);
    }
});

app.post("/updatebio", async (req, res) => {
    const { bioTex } = req.body;
    try {
        let updatedBio = await db.updateBio(bioTex, req.session.userId);
        res.json({ bio: updatedBio.rows[0].bio });
    } catch (err) {
        console.log("Error on the update-bio route: ", err);
    }
});

app.get("/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
