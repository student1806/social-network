import React, { Component } from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="regis-page">
                <h1 className="title"> The Circle Network </h1>
                <img src="/images/logo.png" />
                <HashRouter>
                    <>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </>
                </HashRouter>
            </div>
        );
    }
}
