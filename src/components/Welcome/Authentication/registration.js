import React, { Component } from "react";
import axios from "../../../util/axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/registration", {
                email: this.state.email,
                password: this.state.password,
                first: this.state.first,
                last: this.state.last
            })
            .then(({ data }) => {
                if (!data) {
                    return this.setState({
                        error: true
                    });
                }
                location.replace("/");
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
            <div className="form">
                <h3>Join the Social network below</h3>
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
                <button onClick={() => this.submit()}>submit</button>
                <p>
                    Already a have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}
