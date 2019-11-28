import React from "react";
import axios from "./axios";

export default class UpLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props, ", this.props);
    }

    handleChange(e) {
        let fd = new FormData();
        console.log("e.target .....", e);
        fd.append("file", e.files[0]);
        axios
            .post("/upload", fd)
            .then(res => {
                console.log("Response from the post", res);
                this.setState({ url: res.data.image });
                this.props.upLoadImage(res.data.image);
            })
            .catch(err => {
                console.log("Error in the post upload", err);
            });
    }

    render() {
        return (
            <div className="upload-image">
                <h3>Change your profile pic?</h3>
                <input
                    type="file"
                    name="file"
                    accept="images/*"
                    onChange={e => this.handleChange(e.target)}
                />
            </div>
        );
    }
}

// <input type="file" name="file" accept="images/*">
