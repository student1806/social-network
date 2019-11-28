import React, { Component } from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import UpLoader from "./uploader";

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
                console.log(data);
                this.setState({
                    first: data.userInfo.firstname,
                    last: data.userInfo.lastname,
                    imgurl: data.userInfo.url
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
    render() {
        return (
            <header>
                <img className="logo" src="/images/logo.png" alt="Logo" />
                <div onClick={this.toggleModal}>
                    <ProfilePic
                        firstname={this.state.first}
                        lastname={this.state.last}
                        imgurl={this.state.imgurl}
                    />
                </div>

                {this.state.uploaderIsVisible && (
                    <UpLoader upLoadImage={this.upLoadImage} />
                )}
            </header>
        );
    }
}
