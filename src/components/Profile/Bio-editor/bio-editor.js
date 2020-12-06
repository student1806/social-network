import React from "react";
import axios from "../../../util/axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit bio"
        };
    }

    componentDidMount() {
        console.log("propros in the bio editor ", this.props);
    }

    openText() {
        this.setState({
            editingMode: !this.state.editingMode
        });
    }

    handleChange(textAreaVal) {
        this.setState({
            bio: textAreaVal.value
        });
    }
    clickHandler() {
        let bioObj = { bioTex: this.state.bio };
        axios
            .post("/updatebio", bioObj)
            .then(res => {
                this.setState({
                    bio: res.data.bio,
                    editingMode: false
                });
                this.props.upDateBio(res.data.bio);
            })
            .catch(err => {
                console.log("error on the update bio route: ", err);
            });
    }

    render() {
        let buttonText;
        this.props.bio
            ? (buttonText = "Edit your bio")
            : (buttonText = "Add your bio");
        if (this.state.editingMode) {
            return (
                <>
                    <textarea
                        rows="5"
                        cols="33"
                        onChange={e => this.handleChange(e.target)}
                        defaultValue={this.props.bio}
                    />
                    <button id="link-btn" onClick={e => this.clickHandler(e)}>
                        save
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <p>{this.props.bio}</p>
                    <button id="link-btn" onClick={() => this.openText()}>
                        {buttonText}
                    </button>
                </>
            );
        }
    }
}
