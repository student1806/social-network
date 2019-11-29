import React, { Component } from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import UpLoader from "./uploader";
import { Profile } from "./profile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.upLoadImage = this.upLoadImage.bind(this);
    }
    componentDidMount() {
        axios
            .get("/userinfo")
            .then(({ data }) => {
                console.log("Get data: ", data);
                this.setState({
                    first: data.userInfo.firstname,
                    last: data.userInfo.lastname,
                    imgurl: data.userInfo.url,
                    bio: data.userInfo.bio
                });
            })
            .catch(err => {
                console.log("error on the image upload: ", err);
            });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    upLoadImage(image) {
        console.log("this is my image ", image);
        this.setState({
            imgurl: image,
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    // upDateBio() {
    //     change state here
    // }
    render() {
        //renders the page only when the content is back
        if (!this.state.first) {
            return null;
        }
        return (
            <div>
                <header>
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                    <div onClick={this.toggleModal}>
                        <ProfilePic
                            firstname={this.state.first}
                            lastname={this.state.last}
                            imgurl={this.state.imgurl}
                        />
                    </div>
                </header>

                <Profile
                    firstname={this.state.first}
                    lastname={this.state.last}
                    imgurl={this.state.imgurl}
                />

                {this.state.uploaderIsVisible && (
                    <UpLoader upLoadImage={this.upLoadImage} />
                )}
            </div>
        );
    }
}

// add a small profile pic the the Profile
