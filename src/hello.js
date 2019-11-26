import React from "react";

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    doSomething() {
        this.setState({
            name: "Kitty"
        });
    }
    render() {
        //must return sth
        return "";
    }
}
