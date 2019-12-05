const db = require("./utils/db");

module.exports.getFriendStatus = async (otherId, userId) => {
    try {
        let { rows } = await db.friendStatus(otherId, userId);
        if (rows.length == 0) {
            return "Make Friend Request";
        }
        if (rows[0].sender_id == otherId && !rows[0].accepted) {
            return "Accept Friendship";
        }
        if (!rows[0].accepted) {
            return "Cancel Friends Request";
        } else {
            return "End Friendship";
        }
    } catch (error) {
        console.log("error on the get friends function: ", error);
    }
};

module.exports.updateRequestFriendship = async (otherId, id, btn) => {
    try {
        if (btn == "Make Friend Request") {
            await db.friendRequest(otherId, id);
            return "Cancel Friends Request";
        }
        if (btn == "Accept Friendship") {
            await db.upDateFriendRequest(otherId, id);
            return "End Friendship";
        }
        if (btn == "End Friendship" || "Cancel Friends Request") {
            await db.deleteFriendRequest(otherId, id);
            return "Make Friend Request";
        }
    } catch (error) {
        console.log("error on the update friends function", error);
    }
};
