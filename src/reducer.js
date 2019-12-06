// action defenine what state needs to be changed
export default function reducer(state = {}, action) {
    console.log("state, ", state);

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

    return state;
}

// state = {
//     ...state,
//     //newStateProp: [...state.myArr, action.newValue]
//     newStateProp: state.myArr.filter(elem => {
//         return elem !==1
//     });
// }
