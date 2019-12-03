import React, { useState, useEffects } from "react";
import axios from "./axios";

export function FindPeople() {
    const [users, setUsers] = useState();

    useEffects(() => {
        (async () => {
            const { data } = axios.get("/users");
            setUsers(data);
        })();
    });
    return (
        <>
            <section>
                <h3>Find People</h3>
                <p>Check new users</p>

                {/* {users.map(user => {
                    <div key={user.id}></div>;
                })} */}

                <p>Search for someone</p>
                <input></input>
            </section>
        </>
    );
}
