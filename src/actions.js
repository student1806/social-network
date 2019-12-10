import axios from "./axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    //Sconsole.log("friends wanan be list: ", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannaBes: data
    };
}

export async function acceptFriendRequest(otherId) {
    const { data } = await axios.post("/friend-status", {
        otherId,
        buttonText: "Accept Friendship"
    });
    //console.log(data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id: otherId
    };
}

export async function unfriend(otherId) {
    const { data } = await axios.post("/friend-status", {
        otherId,
        buttonText: "End Friendship"
    });
    //console.log(data);
    return {
        type: "UNFRIEND",
        id: otherId
    };
}

export async function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        msgs
    };
    //do stuff here
    //console.log("messages: ", msgs);
}

export async function chatMessage(msg) {
    console.log("message: ", msg);
    return {
        type: "GET_MESSAGE",
        msg
    };
}
