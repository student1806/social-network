import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password,
                first: this.state.first,
                last: this.state.last
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("Error on the POST register page: ", err);
                this.setState({
                    error: true
                });
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    render() {
        return (
            <div id="form">
                {this.state.error && (
                    <div className="error">Something went wrong</div>
                )}
                <input
                    type="text"
                    name="first"
                    placeholder="first name"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    type="text"
                    name="last"
                    placeholder="last name"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={e => this.submit()}>submit</button>
            </div>
        );
    }
}

// this page will looks similar to the petion where the coockie session get an obj from thj edata base querySelector//
// the only difference is the res.jsson
