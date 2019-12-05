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
    //onClick={this.props.toggleModal}
    render() {
        return (
            // <div className="uploader-wrapper">
            <div className="upload-image">
                <h2 className="up-img-tl">Change profile picture</h2>
                <input
                    className="inputfile"
                    id="file"
                    type="file"
                    name="file"
                    accept="images/*"
                    onChange={e => this.handleChange(e.target)}
                />
                <label htmlFor="file">📂 Choose an image...</label>
            </div>
            // </div>
        );
    }
}

// <input type="file" name="file" accept="images/*">
