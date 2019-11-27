import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let element = ""; //<Welcome />;

// if welcome or login

if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    //element = <Logo />;
    element = <img src="/images/logo.png" alt="Logo" />;
}

ReactDOM.render(element, document.querySelector("main"));
