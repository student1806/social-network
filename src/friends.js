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

    return (
        <>
            <div className="friends-wrapper">
                <h4>Friends List</h4>
                <div className="friends-grid">
                    {friends &&
                        friends.map(user => {
                            return (
                                <div key={user.id}>
                                    <ProfileCard
                                        imgurl={user.url}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        userId={user.id}
                                    />
                                    <button
                                        onClick={e =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        End Friendship
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="friends-wrapper">
                <h4>Friendship Request</h4>
                <div className="friends-grid">
                    {wannabes &&
                        wannabes.map(user => {
                            return (
                                <div key={user.id}>
                                    <ProfileCard
                                        imgurl={user.url}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        userId={user.id}
                                    />
                                    <button
                                        onClick={e =>
                                            dispatch(
                                                acceptFriendRequest(user.id)
                                            )
                                        }
                                    >
                                        Accept Friendship
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
// <div className="user-search" key={user.id}>
//     <Link to={`/user/${user.id}`}>
//         <ProfilePic
//             imgurl={user.url}
//             classPic="avatar"
//         />
//     </Link>
//     <div>
//         <h3>
//             {user.firstname} {user.lastname}
//         </h3>

//         <button
//             onClick={e =>
//                 dispatch(unfriend(user.id))
//             }
//         >
//             End Friendship
//         </button>
//     </div>
// </div>

// <div className="user-search" key={user.id}>
//     <Link to={`/user/${user.id}`}>
//         <ProfilePic
//             imgurl={user.url}
//             classPic="avatar"
//         />
//     </Link>
//     <div>
//         <h3>
//             {user.firstname} {user.lastname}
//         </h3>
