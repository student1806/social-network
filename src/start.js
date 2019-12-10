import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

//Redux setup
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
//////////////

//Instant chat
import { init } from "./socket";

let element = "";

if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    //socket connection for logged-in users
    init(store);
    element = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
ReactDOM.render(element, document.querySelector("main"));
