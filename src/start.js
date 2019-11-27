import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Header from "./header";

let element = ""; //<Welcome />;

// if welcome or login

if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    element = <Header />;
}

// element = <img className="logo" src="/images/logo.png" alt="Logo" />;
ReactDOM.render(element, document.querySelector("main"));
