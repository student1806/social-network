const express = require("express");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
const app = express();
module.exports = app;
const compression = require("compression");
const db = require("./utils/db");
const secret = require("./secrets");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// const { hash, compare } = require("./utils/bc");
const {
    updateRequestFriendship,
    getFriendStatus
} = require("./update-friendship");

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

require("./auth");

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

app.get("/friend-status/:otherId", async (req, res) => {
    const { otherId } = req.params;
    const { userId } = req.session;

    try {
        let getBtnText = await getFriendStatus(otherId, userId);
        res.json(getBtnText);
    } catch (err) {
        console.log("Error on the friends status route: ", err);
    }
});

app.post("/friend-status", async (req, res) => {
    const { otherId } = req.body;
    const { userId } = req.session;
    const { buttonText } = req.body;

    try {
        let updateBtn = await updateRequestFriendship(
            otherId,
            userId,
            buttonText
        );
        res.json(updateBtn);
    } catch (err) {
        console.log("Error on the request friendship route: ", err);
    }
});

//Friendship Want to be

app.get("/friends-wannabes", async (req, res) => {
    const { userId } = req.session;
    try {
        //let friendStatus = await db.getFriendList(userId);
        let { rows } = await db.getFriendList(userId);
        res.json(rows);
    } catch (e) {
        console.log("Error on the friends want to be route: ", e);
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
