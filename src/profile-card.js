import React from "react";
import { ProfilePic } from "./profile-pic";
import { Link } from "react-router-dom";

export function ProfileCard({ userId, imgurl, firstname, lastname }) {
    return (
        <div className="user-search" key={userId}>
            <ProfilePic imgurl={imgurl} classPic="avatar" />
            <Link to={`/user/${userId}`}>
                {firstname} {lastname}
            </Link>
        </div>
    );
}
