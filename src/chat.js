import React, { useEffect, useRef } from "react";
import { ProfileCard } from "./profile-card";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector(state => state && state.msgs);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
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
                rows="5"
                cols="50"
                placeholder="Add message here..."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
