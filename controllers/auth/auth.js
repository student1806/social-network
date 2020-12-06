//const app = require("./index");
const express = require('express');
const router =  express.Router();
const db = require("../../models/db");
const { hash, compare } = require("../../utils/bc");


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let { rows } = await db.getUser(email);
        if (rows.length === 0) {
            return res.json({
                success: false
            });
        }
        let comparePw = await compare(password, rows[0].password);
        if (!comparePw) {
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

router.post("/registration", async (req, res) => {
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

module.exports = router;
