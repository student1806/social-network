const express = require('express');
const router =  express.Router();
const db = require("../../utils/db");
const {getFriendStatus, updateRequestFriendship} = require("../../update-friendship");

router.get("/friend-status/:otherId", async (req, res) => {
    const { otherId } = req.params;
    const { userId } = req.session;

    try {
        let getBtnText = await getFriendStatus(otherId, userId);
        res.json(getBtnText);
    } catch (err) {
        console.log("Error on the friends status route: ", err);
    }
});

router.post("/friend-status", async (req, res) => {
    const { otherId, buttonText } = req.body;
    const { userId } = req.session;

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

router.get("/friends-wannabes", async (req, res) => {
    const { userId } = req.session;
    try {
        //let friendStatus = await db.getFriendList(userId);
        let { rows } = await db.getFriendList(userId);
        res.json(rows);
    } catch (e) {
        console.log("Error on the friends want to be route: ", e);
    }
});

module.exports = router;