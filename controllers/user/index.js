const express = require('express');
const db = require("../../utils/db");
const router = express.Router();

//name it with the json extention to avoid conflict with the client rendering page
router.get("/user", async (req, res) => {
    try {
        let userInfo = await db.getUserInfo(req.session.userId);
        res.json({
            userInfo: userInfo.rows[0]
        });
    } catch (e) {
        console.log("Error on the get user info: ", e);
    }
});

router.get("/user/:id", async (req, res) => {
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

module.exports = router;