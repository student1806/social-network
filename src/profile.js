import React from "react";
import { ProfilePic } from "./profile-pic";
import { BioEditor } from "./bio-editor";

export let bioCard = {
    height: 400,
    width: 700,
    display: "flex",
    justifyContent: "space-around",
    margin: 40,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.3)"
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
