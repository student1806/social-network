import * as io from "socket.io-client";

//These functions dont need axios requests
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        //any chat related can be done online user, private message,

        //datat
        // socket.on("something", msg => {
        //     console.log("got a msm from the backend; ", msg);
        // });

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
