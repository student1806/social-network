import * as io from "socket.io-client";

import { chatMessages, chatMessage, onlineUsers } from "../../service/actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("disconnect", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("chatMessages", msgs => {
            store.dispatch(chatMessages(msgs));
        });

        socket.on("chatMessage", msg => {
            store.dispatch(chatMessage(msg));
        });
    }
};
