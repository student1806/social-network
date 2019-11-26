import React from "react";
import Register from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1> Welcome to my Social network Page </h1>

                <Register />
            </div>
        );
    }
}
