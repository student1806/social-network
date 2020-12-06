import React from "react";
import axios from "../../util/axios";
import { ProfilePic } from "./profile-pic";
import { bioCard } from "./profile";
import { editor } from "./profile";
import { FriendshipButton } from "../Friendship-button/friendship-button";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let otherId = this.props.match.params.id;
        // if (this.props.match.params.id != this.props.id) {
        try {
            let { data } = await axios.get("/api/user/" + otherId);
            let { otherUser } = data;
            //console.log("response. ", data);

            if (data.success) {
                this.setState({
                    firstname: otherUser.firstname,
                    lastname: otherUser.lastname,
                    imgurl: otherUser.url,
                    bio: otherUser.bio
                });
            } else {
                this.props.history.push("/");
            }
        } catch (e) {
            console.log("Error on the getOther request; ", e);
        }
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
                <div style={editor}>
                    <h3>
                        {this.state.firstname} {this.state.lastname}
                    </h3>
                    <p>{this.state.bio}</p>
                    <FriendshipButton otherId={this.props.match.params.id} />
                </div>
            </section>
        );
    }
}
