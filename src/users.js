import React, { useState, useEffect } from "react";
import axios from "./axios";
import { ProfileCard } from "./profile-card";

export function FindPeople() {
    const [users, setUsers] = useState([]);

    const [searchUsers, setSearchUsers] = useState();
    const [val, setVal] = useState();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/users/");
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

    return (
        <>
            <section>
                <h3>Find People</h3>
                <input onChange={e => setVal(e.target.value)} />
                <div className="friends-grid">
                    {searchUsers &&
                        searchUsers.map(user => {
                            return (
                                <>
                                    <ProfileCard
                                        imgurl={user.url}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        userId={user.id}
                                    />
                                </>
                            );
                        })}
                </div>

                <h3>Check new users</h3>
                <div className="friends-grid">
                    {users &&
                        users.map(user => {
                            return (
                                <>
                                    <ProfileCard
                                        imgurl={user.url}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        userId={user.id}
                                    />
                                </>
                            );
                        })}
                </div>
            </section>
        </>
    );
}
