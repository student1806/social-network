import React from "react";

export function ProfilePic({ firstname, imgurl, lastname }) {
    imgurl = imgurl || "/images/avatar.png";
    // <h2>I am the profile pic {firstname}</h2>;
    return (
        <>
            <img className="avatar" src={imgurl} />
        </>
    );
}
