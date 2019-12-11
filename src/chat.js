import React, { useEffect, useRef } from "react";
import { ProfileChat } from "./profile-card";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector(state => state && state.msgs);
    const onlineUsers = useSelector(state => state && state.onlineUsers);
    console.log("onlineUsers in chat.js: ", onlineUsers);

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
                                <ProfileChat
                                    imgurl={msg.url}
                                    firstname={msg.firstname}
                                    lastname={msg.lastname}
                                    userId={msg.id}
                                    message={msg.message}
                                    time={msg.created_at}
                                />
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
