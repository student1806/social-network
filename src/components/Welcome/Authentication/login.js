import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../../util/axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async submit() {
        const auth = {
            email: this.state.email,
            password: this.state.password
        };
        try {
            let { data } = await axios.post("/login", auth);
            if (!data.success) {
                return this.setState({
                    error: true
                });
            }
            location.replace("/");
        } catch (err) {
            console.log("Error on the POST Log in page: ", err);
        }
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    render() {
        return (
            <div className="form">
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
                <button onClick={() => this.submit()}>submit</button>
                <Link to="/">Take me to registration</Link>
            </div>
        );
    }
}
