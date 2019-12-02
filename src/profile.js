import React from "react";
import { ProfilePic } from "./profile-pic";
import { BioEditor } from "./bio-editor";

let bioCard = {
    border: "1px solid black",
    height: 400,
    width: 500,
    display: "flex",
    justifyContent: "space-around",
    margin: 40
};

let editor = {};

export function Profile(props) {
    return (
        <section style={bioCard}>
            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                imgurl={props.imgurl}
            />
            <div style={editor}>
                <h3>
                    {props.firstname} {props.lastname}
                </h3>
                <BioEditor
                    firstname={props.firstname}
                    lastname={props.lastname}
                    imgurl={props.imgurl}
                    bio={props.bio}
                    upDateBio={props.upDateBio}
                />
            </div>
        </section>
    );
}
