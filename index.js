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

app.post("/login", (req, res) => {
    let email = req.body.email;
    let pw = req.body.password;

    db.getUser(email)
        .then(({ rows }) => {
            compare(pw, rows[0].password)
                .then(val => {
                    if (val) {
                        req.session.userId = rows[0].id;
                        console.log("success");
                        console.log(req.session.userId);
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                })
                .catch(err => {
                    console.log("Comapare: ", err);
                    res.json({
                        success: false
                    });
                });
        })
        .catch(err => {
            console.log("Error on the login page: ", err);
            res.json({
                success: false
            });
        });
});

app.post("/register", (req, res) => {
    let firstname = req.body.first;
    let lastname = req.body.last;
    let email = req.body.email;
    let pw = req.body.password;
    hash(pw)
        .then(hashedpwd => {
            db.addUser(firstname, lastname, email, hashedpwd)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    console.log("success");
                    console.log(req.session.userId);
                    res.json({
                        success: true
                    });
                })
                .catch(err => {
                    console.log("Error on the registar POST", err);
                    res.json({
                        success: false
                    });
                });
        })
        .catch(err => {
            console.log("Error on the hashedpwd method: ", err);
            res.json({
                success: false
            });
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
