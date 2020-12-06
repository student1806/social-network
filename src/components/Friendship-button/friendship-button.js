import React, { useState, useEffect } from "react";
import axios from "../../util/axios";

export function FriendshipButton({ otherId }) {
    const [buttonText, setButtonText] = useState();

    console.log(otherId);

    //useEffects is the hooks equivalent of componentDidMount
    useEffect(() => {
        (async () => {
            try {
                let { data } = await axios.get("/friend-status/" + otherId);
                setButtonText(data);
            } catch (error) {
                console.log("error on the friendship: ", error);
            }
        })();
    }, []);
    console.log("buttonText: ", buttonText);

    function submit() {
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
