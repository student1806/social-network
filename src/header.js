import React, { Component } from "react";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <header>
                <img className="logo" src="/images/logo.png" alt="Logo" />
            </header>
        );
    }
}
