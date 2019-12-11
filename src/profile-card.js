import React from "react";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";
import moment from "moment";

export function ProfileCard({ userId, imgurl, firstname, lastname }) {
    return (
        <div className="user-search" key={userId}>
            <ProfilePic imgurl={imgurl} classPic="avatar" />
            <Link to={`/user/${userId}`}>
                <h3>
                    {firstname} {lastname}
                </h3>
            </Link>
        </div>
    );
}

export function ProfileChat({
    userId,
    imgurl,
    firstname,
    lastname,
    message,
    time
}) {
    return (
        <div className="user-chat" key={userId}>
            <ProfilePic imgurl={imgurl} classPic="avatar" />

            <div className="msg-area">
                <div className="chat-title">
                    <h3>
                        {firstname} {lastname}
                    </h3>
                    <p className="time">
                        {moment(time).format("MMM Do YY, h:mm")}
                    </p>
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
}
