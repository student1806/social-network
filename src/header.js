import React, { Component } from "react";
import { ProfilePic } from "./profile-pic";
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
                <nav>
                    <Link className="link-nav" to="/friends">
                        Friends
                    </Link>
                    <Link className="link-nav" to="/chat">
                        Chat
                    </Link>
                    <Link className="link-nav" to="/find-people">
                        Find People
                    </Link>
                    <a className="link-nav" href="/logout">
                        Logout
                    </a>
                    <ProfilePic
                        imgurl={this.props.imgurl}
                        toggleModal={this.props.toggleModal}
                        classPic="avatar"
                    />
                </nav>
            </header>
        );
    }
}
