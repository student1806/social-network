import React, { useState, useEffect } from "react";
import axios from "../../util/axios";
import { ProfileCard } from "../Profile/profile-card";

export function FindPeople() {
    const [users, setUsers] = useState([]);

    const [searchUsers, setSearchUsers] = useState();
    const [val, setVal] = useState();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/find-users/");
                setUsers(data);
            } catch (error) {
                console.log("Error on the latest people route: ", error);
            }
        })();
    }, []);

    useEffect(() => {
        let ignore = false;
        if (val == "") {
            setSearchUsers([]);
            return;
        }
        (async () => {
            try {
                const { data } = await axios.get("/api/find-users/" + val);
                if (!ignore) {
                    setSearchUsers(data);
                } else {
                    setSearchUsers([]);
                }
            } catch (e) {
                console.log("Error on the latest find route: ", e);
            }
        })();
        return () => (ignore = true);
    }, [val]);
    if (!searchUsers) {
        return null;
    }

    const userList = users => {
        return users.map(user => {
            return (
                <div key={user.id}>
                    <ProfileCard
                        imgurl={user.url}
                        firstname={user.firstname}
                        lastname={user.lastname}
                        userId={user.id}
                    />
                </div>
            );
        });
    };

    return (
        <>
            <div className="friends-wrapper">
                <h3>Find People</h3>
                <input onChange={e => setVal(e.target.value)} />
                <div className="friends-grid"> {userList(searchUsers)}</div>
            </div>
            <div className="friends-wrapper">
                <h3>Check new users</h3>
                <div className="friends-grid"> {userList(users)}</div>
            </div>
        </>
    );
}
