import React, { useState, useEffect } from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";

export function FindPeople() {
    const [users, setUsers] = useState([]);

    const [searchUsers, setSearchUsers] = useState();
    const [val, setVal] = useState();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/users/");
                setUsers(data);
                //console.log("new users data; ", data.newUsers);
            } catch (error) {
                console.log("Error on the latest people route: ", error);
            }
        })();
    }, []);

    useEffect(() => {
        //console.log("searchUsers: ", searchUsers);

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

    return (
        <>
            <section>
                <h3>Find People</h3>
                <p>Check new users</p>

                {users &&
                    users.map(user => {
                        return (
                            <div key={user.id}>
                                <ProfilePic
                                    imgurl={user.url}
                                    classPic="avatar"
                                />
                                {user.firstname} {user.lastname}
                            </div>
                        );
                    })}

                <p>Search for someone?</p>
                <input onChange={e => setVal(e.target.value)} />
                {searchUsers &&
                    searchUsers.map(user => {
                        return (
                            <div key={user.id}>
                                <ProfilePic
                                    imgurl={user.url}
                                    classPic="avatar"
                                />
                                {user.firstname} {user.lastname}
                            </div>
                        );
                    })}
            </section>
        </>
    );
}
