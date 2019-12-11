export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendsAndWannaBes: action.friendsAndWannaBes
        };
    }
    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsAndWannaBes: state.friendsAndWannaBes.map(elem => {
                if (action.id == elem.id) {
                    return {
                        ...elem,
                        accepted: true
                    };
                } else {
                    return elem;
                }
            })
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsAndWannaBes: state.friendsAndWannaBes.filter(elem => {
                console.log("UNFRIEND friendship");
                return action.id != elem.id;
            })
        };
    }
    if (action.type === "GET_MESSAGES") {
        state = {
            ...state,
            msgs: action.msgs
        };
    }
    if (action.type === "GET_MESSAGE") {
        state = {
            ...state,
            msgs: [...state.msgs, action.msg]
        };
    }

    if (action.type === "GET_USERS") {
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }
    return state;
}
