const express = require('express');
const db = require("../../models/db");
const router =  express.Router();

router.get("/find-users/", async (req, res) => {
    try {
        let { rows } = await db.getNewUsers();
        res.json(rows);
    } catch (error) {
        console.log("Error on the get more users: ", error);
    }
});

router.get("/find-users/:val", async (req, res) => {
    const { val } = req.params;
    try {
        let { rows } = await db.searchUsers(val);
        res.json(rows);
    } catch (err) {
        console.log("Error on the seacrh users route: ", err);
    }
});

module.exports = router;