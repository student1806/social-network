import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendshipButton({ otherId }) {
    const [buttonText, setButtonText] = useState();

    console.log(otherId);

    //useEffects is the hooks equivalent of componentDidMount
    useEffect(() => {
        (async () => {
            try {
                let { data } = await axios.get("/friend-status/" + otherId);
                //console.log("Friends status: ", data);
                setButtonText(data);
            } catch (error) {
                console.log("error on the friendship: ", error);
            }
        })();
    }, []);
    console.log("buttonText: ", buttonText);

    function submit() {
        //OR make a post to onme route, and let the route determine the logic

        (async () => {
            try {
                let { data } = await axios.post("/friend-status/", {
                    otherId,
                    buttonText
                });
                setButtonText(data);
            } catch (error) {
                console.log(
                    "Error on the request friendship button people route: ",
                    error
                );
            }
        })();
    }
    return (
        <div>
            <button className="" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
