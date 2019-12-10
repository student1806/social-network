import React, { useEffect, useRef } from "react";
import { ProfileCard } from "./profile-card";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector(state => state && state.msgs);
    // this will be undefined until we have to whploe flow
    //console.log("chatMessages", chatMessages);
    //New message
    // const chatMessage = useSelector(state => state && state.msg);
    // console.log("chatMessage: ", chatMessage);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key === "Enter") {
            // console.log("e.target.value: ", e.target.value);
            // console.log("e.key:", e.key);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1>Chat room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msg => {
                        return (
                            <div key={msg.id}>
                                <ProfileCard
                                    imgurl={msg.url}
                                    firstname={msg.firstname}
                                    lastname={msg.lastname}
                                    userId={msg.id}
                                />
                                <p>{msg.message}</p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="Add message here..."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
