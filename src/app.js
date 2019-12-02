import React, { Component } from "react";
import axios from "./axios";
// import { ProfilePic } from "./profile-pic";
import UpLoader from "./uploader";
import { Profile } from "./profile";
import Header from "./header";
import { BrowserRouter, Route } from "react-router-dom";
import { OtherProfile } from "./otherprofile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.upLoadImage = this.upLoadImage.bind(this);
        this.upDateBio = this.upDateBio.bind(this);
    }
    componentDidMount() {
        axios
            .get("/userinfo.json")
            .then(({ data }) => {
                console.log("data from app ", data);
                this.setState({
                    firstname: data.userInfo.firstname,
                    lastname: data.userInfo.lastname,
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
        // console.log("this is my image ", image);
        this.setState({
            imgurl: image,
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    upDateBio(upDateBio) {
        this.setState({ bio: upDateBio });
    }
    render() {
        // renders the page only when the content is back
        if (!this.state.firstname) {
            return null;
        }
        return (
            <>
                {/* <header>
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                    <div onClick={this.toggleModal}>
                        <ProfilePic
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            imgurl={this.state.imgurl}
                        />
                    </div>
                </header> */}
                {/* <Header
                    imgurl={this.state.imgurl}
                    toggleModal={this.toggleModal}
                ></Header> */}

                <BrowserRouter>
                    <div>
                        <Header
                            imgurl={this.state.imgurl}
                            toggleModal={this.toggleModal}
                        ></Header>

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    imgurl={this.state.imgurl}
                                    bio={this.state.bio}
                                    upDateBio={this.upDateBio}
                                />
                            )}
                        />
                        {/* can't have the same name as the router from the server */}
                        <Route path="/user/:id" component={OtherProfile} />
                    </div>
                </BrowserRouter>

                {/* <Profile
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    imgurl={this.state.imgurl}
                    bio={this.state.bio}
                    upDateBio={this.upDateBio}
                /> */}
                {this.state.uploaderIsVisible && (
                    <UpLoader upLoadImage={this.upLoadImage} />
                )}
            </>
        );
    }
}
