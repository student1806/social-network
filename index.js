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

app.get("/userinfo", async (req, res) => {
    try {
        let userInfo = await db.getUserInfo(req.session.userId);
        res.json({
            userInfo: userInfo.rows[0]
        });
    } catch (e) {
        console.log("Error on the get user info: ", e);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let getHashed = await db.getUser(email);
        let comaparePw = await compare(password, getHashed.rows[0].password);
        if (comaparePw) {
            req.session.userId = getHashed.rows[0].id;
            console.log(req.session.userId);
            console.log(req.session.user);
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    } catch (err) {
        console.log("Error on the login route: ", err);
        res.json({
            success: false
        });
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;
    try {
        let hashedpwd = await hash(password);
        let id = await db.addUser(first, last, email, hashedpwd);

        req.session.userId = id;
        res.json({
            success: true
        });
    } catch (err) {
        console.log("error on the post registration: ", err);
        res.json({
            success: false
        });
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    //const { title, description, username } = req.body;
    const imageUrl = `${s3Url}${req.file.filename}`;
    db.updateImage(imageUrl, req.session.userId)
        .then(() => {
            res.json({
                image: imageUrl
            });
        })
        .catch(err => {
            console.log(err);
        });
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
