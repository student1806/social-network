import React from "react";
import ReactDOM from "react-dom";
// import Hello from "./hello";
import Welcome from "./welcome";

let element = <Welcome />;

if (location.pathname != "/welcome") {
    element = <img src="/images/logo.png" alt="Logo" />;
}

ReactDOM.render(element, document.querySelector("main"));
