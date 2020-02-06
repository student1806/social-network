import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    receiveFriendsWannabes,
    unfriend,
    acceptFriendRequest
} from "./actions";
import { ProfilePic } from "./profile-pic";
import { ProfileCard } from "./profile-card";

export function FriendsList() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return (
            state.friendsAndWannaBes &&
            state.friendsAndWannaBes.filter(elem => elem.accepted == true)
        );
    });

    const wannabes = useSelector(state => {
        return (
            state.friendsAndWannaBes &&
            state.friendsAndWannaBes.filter(elem => elem.accepted == false)
        );
    });

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    const friendsList = (relation, status, buttonText) => {
        return (
            relation &&
            relation.map(user => {
                return (
                    <div key={user.id}>
                        <ProfileCard
                            imgurl={user.url}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            userId={user.id}
                        />
                        <button onClick={e => dispatch(status(user.id))}>
                            {buttonText}
                        </button>
                    </div>
                );
            })
        );
    };

    return (
        <>
            <div className="friends-wrapper">
                <h4>Friends List</h4>
                <div className="friends-grid">
                    {friendsList(friends, unfriend, "End Friendship")}
                </div>
            </div>
            <div className="friends-wrapper">
                <h4>Friendship Request</h4>
                <div className="friends-grid">
                    {friendsList(
                        wannabes,
                        acceptFriendRequest,
                        "Accept Friendship"
                    )}
                </div>
            </div>
        </>
    );
}
