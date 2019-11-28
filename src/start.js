import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Header from "./header";
import App from "./app";

let element = "";

if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    element = <App />;
}
ReactDOM.render(element, document.querySelector("main"));
