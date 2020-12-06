import React from 'react';
import {Link} from "react-router-dom";
import { ProfilePic } from "../Profile/profile-pic";

export const Navigation = (props) => {
    return (
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
                imgurl={props.imgurl}
                toggleModal={props.toggleModal}
                classPic="avatar"
            />
        </nav>
    );
};