import React, { useState, useEffect } from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";

export function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState("");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(
                `/users.json/${searchUsers || ""}`
            );
            setUsers(data.newUsers);
            console.log("new users data; ", data.newUsers);
        })();
    }, [searchUsers]);
    return (
        <>
            <section>
                <h3>Find People</h3>
                <p>Check new users</p>

                {users.map(user => {
                    return (
                        <div key={user.id}>
                            <ProfilePic imgurl={user.url} classPic="avatar" />
                            {user.firstname} {user.lastname}
                        </div>
                    );
                })}

                <p>Search for someone</p>
                <input onChange={e => setSearchUsers(e.target.value)} />
            </section>
        </>
    );
}
