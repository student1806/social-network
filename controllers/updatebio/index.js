const express = require('express');
const db = require("../../models/db");
const router = express.Router();

router.post("/", async (req, res) => {
    const { bioTex } = req.body;
    try {
        let updatedBio = await db.updateBio(bioTex, req.session.userId);
        res.json({ bio: updatedBio.rows[0].bio });
    } catch (err) {
        console.log("Error on the update-bio route: ", err);
    }
});

module.exports = router;