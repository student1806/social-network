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
        console.log("prpros in the bio editor ", this.props);
        if (!this.props.bio) {
            this.setState(
                {
                    buttonText: "add your bio"
                },
                () => console.log("this sete  ", this.state)
            );
        }
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div>
                    <h1>I am the editor mode</h1>
                    <textarea defaultValue={this.props.bio} />
                    <button>save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>I am the bio editor</h1>
                    <button>{this.state.buttonText}</button>
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
