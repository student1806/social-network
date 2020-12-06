const express = require('express');
const db = require("../../models/db");
const s3 = require("../../config/s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const { s3Url } = require("../../config/config.json");
const router = express.Router();

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

router.post("/", uploader.single("file"), s3.upload, async (req, res) => {
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
module.exports = router;