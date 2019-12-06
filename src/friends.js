import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    unfriend,
    acceptFriendRequest
} from "./actions";
import { ProfilePic } from "./profile-pic";

export function FriendsList() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        console.log("in function passed to useSelector", state);

        return (
            state.friendsAndWannaBes &&
            state.friendsAndWannaBes.filter(elem => elem.accepted == true)
        );
    });

    const wannabes = useSelector(state => {
        //console.log("in function passed to useSelector", state);

        return (
            state.friendsAndWannaBes &&
            state.friendsAndWannaBes.filter(elem => elem.accepted == false)
        );
    });

    console.log("friends", friends);
    console.log("wannabes", wannabes);

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    return (
        <>
            <h1>This is the friends List</h1>
            {friends &&
                friends.map(user => {
                    return (
                        <div className="user-search" key={user.id}>
                            <ProfilePic imgurl={user.url} classPic="avatar" />
                            {user.firstname} {user.lastname}
                            <button onClick={e => dispatch(unfriend(user.id))}>
                                End Friendship
                            </button>
                        </div>
                    );
                })}
            <h1>This is the WannaBes list</h1>
            {wannabes &&
                wannabes.map(user => {
                    return (
                        <div className="user-search" key={user.id}>
                            <ProfilePic imgurl={user.url} classPic="avatar" />
                            {user.firstname} {user.lastname}
                            <button
                                onClick={e =>
                                    dispatch(acceptFriendRequest(user.id))
                                }
                            >
                                Accept Friendship
                            </button>
                        </div>
                    );
                })}
        </>
    );
}
