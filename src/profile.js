import React from "react";
import { ProfilePic } from "./profile-pic";
import { BioEditor } from "./bio-editor";

export let bioCard = {
    height: 400,
    width: 600,
    display: "flex",
    justifyContent: "space-around",
    margin: 40
};

export let editor = {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
};

export function Profile(props) {
    return (
        <section style={bioCard}>
            <ProfilePic
                firstname={props.firstname}
                lastname={props.lastname}
                imgurl={props.imgurl}
                classPic="bio-image"
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
                    id={props.id}
                />
            </div>
        </section>
    );
}
