import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
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
                console.log("Error on the POST Log in page: ", err);
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
            <div>
                <h3>Please log in below</h3>
                {this.state.error && (
                    <div className="error">Something went wrong</div>
                )}
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
                <Link to="/">Take me to registration</Link>
            </div>
        );
    }
}
