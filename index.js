const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");

app.use(express.static("./public"));
app.use(compression());
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let getHashed = await db.getUser(email);
        let comaparePw = await compare(password, getHashed.rows[0].password);
        if (comaparePw) {
            req.session.userId = getHashed.rows[0].id;
            console.log(req.session.userId);
            res.json({
                success: true
            });
        }
    } catch (err) {
        console.log("Error on the login route: ", err);
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
    }
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
