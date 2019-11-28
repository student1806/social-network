import React from "react";

export function ProfilePic({ firstname, imgurl, lastname }) {
    imgurl = imgurl || "/images/avatar.png";
    return (
        <>
            <img className="avatar" src={imgurl} />
            <p>{firstname}</p>
        </>
    );
}
