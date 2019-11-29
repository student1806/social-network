import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit bio"
        };
    }

    componentDidMount() {
        // change the state of the button depending on the information from the database
        //if else
        console.log("propros in the bio editor ", this.props);
        if (!this.props.bio) {
            this.setState(
                {
                    buttonText: "add your bio"
                },
                () => console.log("this stae  ", this.state)
            );
        }
    }

    toggleModal() {
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
        console.log(this.state.bio);
        let obj = { bioTex: this.state.bio };
        axios
            .post("/updatebio", obj)
            .then(res => {
                this.setState({
                    bio: res.data.bio,
                    editingMode: false
                });
                console.log(this.state.bio);
                this.props.upDateBio(res.data.bio);
            })
            .catch(err => {
                console.log("error on the update bio route: ", err);
            });
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div>
                    <h1>I am the editor mode</h1>
                    <textarea
                        onChange={e => this.handleChange(e.target)}
                        defaultValue={this.props.bio}
                    />
                    <button onClick={e => this.clickHandler(e)}>save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <button onClick={() => this.toggleModal()}>
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
// needs to be in 2 states
// add bio or show bio
// edit button
// onclick envent on the butto that can change the state of the editor
// when we click on the save button, a axios requested is needed the to update the bio
