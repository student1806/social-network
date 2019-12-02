import React, { Component } from "react";
import { ProfilePic } from "./profile-pic";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <header>
                <img className="avatar" src="/images/logo.png" alt="Logo" />
                <ProfilePic
                    imgurl={this.props.imgurl}
                    toggleModal={this.props.toggleModal}
                    classPic="avatar"
                />
            </header>
        );
    }
}

// Move the profile pic to the header and pass a dinamict class props className
//props.ProfilePicClass
