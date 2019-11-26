import React, { Component } from "react";
import Register from "./registration";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1> Welcome to my Social network Page </h1>
                <img src="/images/logo.png" />
                <p>Join the Social network below</p>
                <Register />
                <p>
                    Already a have an account?{" "}
                    <a href="javascript://">Log in</a>
                </p>
            </div>
        );
    }
}
