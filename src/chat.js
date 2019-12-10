import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector(state => state && state.chatMessages);
    // this will be undefined until we have to whploe flow
    console.log("chatMessages", chatMessages);

    useEffect(() => {
        console.log("chat mounted");
        console.log("elemRef: ", elemRef.current);
        console.log("scrollto: ", elemRef.current.scrollTop);
        console.log("client Height: ", elemRef.current.clientHeight);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = e => {
        if (e.key === "Enter") {
            console.log("e.target.value: ", e.target.value);
            console.log("e.key:", e.key);
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1>Chat room</h1>
            <div className="chat-container" ref={elemRef}>
                <p>Chat message will go here</p>
            </div>
            <textarea
                placeholder="Add message here..."
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
