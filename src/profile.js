import React from "react";
import { ProfilePic } from "./profile-pic";
import { BioEditor } from "./bio-editor";

export function Profile(props) {
    // console.log("props in profile ", props);
    return (
        <>
            <h1>I am the profile picture {props.firstname}</h1>
            <ProfilePic
                firstname={props.first}
                lastname={props.last}
                imgurl={props.imgurl}
            />

            <BioEditor
                firstname={props.first}
                lastname={props.last}
                imgurl={props.imgurl}
                bio={props.bio}
            />
        </>
    );
}
// needs the uploader
// add a ProfilePicClass

// pass props to the BioEditor
