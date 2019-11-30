import React from "react";

export function ProfilePic({ firstname, imgurl, lastname, toggleModal }) {
    imgurl = imgurl || "/images/avatar.png";
    return (
        <>
            <img className="avatar" src={imgurl} onClick={toggleModal} />

            {/* <p>{firstname}</p> */}
        </>
    );
}
