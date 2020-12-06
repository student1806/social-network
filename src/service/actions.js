import axios from "../util/axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannaBes: data
    };
}

export async function acceptFriendRequest(otherId) {
    await axios.post("/friend-status", {
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
    await axios.post("/friend-status", {
        otherId,
        buttonText: "End Friendship"
    });
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
}

export async function chatMessage(msg) {
    return {
        type: "GET_MESSAGE",
        msg
    };
}

export function onlineUsers(users) {
    return {
        type: "GET_USERS",
        onlineUsers: users
    };
}

export function offlineUsers(users) {
    return {
        type: "UPDATE_USERS",
        onlineUsers: users
    };
}
