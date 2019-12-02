import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import { bioCard } from "./profile";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        //console.log("this.props.match: ", this.props.match);
        let otherId = this.props.match.params.id;
        // if (this.props.match.params.id == 6) {
        //     this.props.history.push("/");
        // } else {
        try {
            let { data } = await axios.get("/user.json/" + otherId);
            let { otherUser } = data;

            console.log("response. ", data);

            this.setState({
                firstname: otherUser.firstname,
                lastname: otherUser.lastname,
                imgurl: otherUser.url,
                bio: otherUser.bio
            });
        } catch (e) {
            console.log("Error on the getOther request; ", e);
            this.props.history.push("/");
        }
        //}
    }

    render() {
        return (
            <section style={bioCard}>
                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    imgurl={this.state.imgurl}
                    bio={this.state.bio}
                    classPic="bio-image"
                />
                <div>
                    <h3>
                        {this.state.firstname} {this.state.lastname}
                    </h3>
                    <p>{this.state.bio}</p>
                </div>
            </section>
        );
    }
}
