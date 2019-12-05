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
                <img className="avatar" src="/images/logo.png" alt="Logo" />
                <nav>
                    <Link className="link-nav" to="/users">
                        Users
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

// Move the profile pic to the header and pass a dinamict class props className
//props.ProfilePicClass
