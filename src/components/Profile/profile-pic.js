import React from "react";

export function ProfilePic({
    firstname,
    imgurl,
    lastname,
    toggleModal,
    classPic
}) {
    imgurl = imgurl || "/images/avatar.png";
    return (
        <>
            <img className={classPic} src={imgurl} onClick={toggleModal} />
        </>
    );
}
//conditionaly uses a class to the image className={size}
//let size = props.primary = ? 'primary': 'secondary'
