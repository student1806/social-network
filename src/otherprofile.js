import React from "react";
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match: ", this.props.match);
        //find the id of the user
        console.log("this.props.match.params.id", this.props.match.params.id);
        //we need to figureout if the otheruser Id id the same as the logged user id
        if (this.props.match.params.id == 6) {
            this.props.history.push("/");
        }
    }
    async getOther() {
        let res = await axios.get("/user/" + this.props.match.params.id);
        let { data } = res.data;
        this.setState({
            firstname: data.userInfo.firstname,
            lastname: data.userInfo.lastname,
            imgurl: data.userInfo.url,
            bio: data.userInfo.bio
        });
    }

    render() {
        return (
            <div>
                <h1>This is the other prolfile page</h1>
            </div>
        );
    }
}
