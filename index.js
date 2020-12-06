const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const secret = require("./secrets");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

//Socket io related
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
//////////

app.use(express.static("./public"));
app.use(compression());
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: secret.cookieSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.use(require('./controllers'));

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, () =>
    console.log("I'm listenig social network on port 8080")
);

const onlineUsers = {};
io.on("connection", async socket => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const { userId } = socket.request.session;
    onlineUsers[socket.id] = userId;
    const usersId = Object.values(onlineUsers);

    try {
        const { rows } = await db.getOnlineUsers(usersId);
        io.emit("onlineUsers", rows);
    } catch (e) {
        console.log("Error on the get online users query: ", e);
    }

    socket.on("disconnect", async () => {
        delete onlineUsers[socket.id];
        const offlineId = Object.values(onlineUsers);
        try {
            const { rows } = await db.getOnlineUsers(offlineId);
            io.emit("disconnect", rows);
        } catch (e) {
            console.log("Error on the get offline users query: ", e);
        }
    });

    try {
        const { rows } = await db.getLastTenChatMessages();
        io.sockets.emit("chatMessages", rows.reverse());
    } catch (e) {
        console.log("error on the get last 10 messages: ", e);
    }

    socket.on("chatMessage", async msg => {
        try {
            await db.addNewChatMessage(userId, msg);
            const { rows } = await db.getNewChatmessage();

            io.emit("chatMessage", rows[0]);
        } catch (e) {
            console.log("Error on the inserting new message to db, ", e);
        }
    });
});
