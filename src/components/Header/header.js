import React, { Component } from "react";
import { Navigation } from './Navigation';
import { Link } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <header>
                <Link to="/">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                </Link>
                <Navigation
                    imrurl={this.props.imgurl}
                    toggleModal={this.props.toggleModal}
                />
            </header>
        );
    }
}
