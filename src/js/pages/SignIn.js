import React from "react";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";

// Main data store for handling and processing
@connect((store) => {
    return {
        userObjuser: store.user.userObjuser,
    };
})

export default class SignIn extends React.Component {
    // Handle submit of user details
    handleClick(event) {
        // Prevent reload
        event.preventDefault();
        const { user } = this.refs;
        this.props.dispatch(userActions.logUser(user.value));
        user.value = "";
    }

    // After successful login
    componentDidUpdate() {
        // Change path to chatroom
        this.props.router.push("chatroom");
    }

    render() {
        // Render the main dashboard after data has been loaded
        return (
        <div class="login">
            <h2>Login</h2>
            <form>
                <label for="log-username">
                    Username
                    <input type="text" id="log-username" name="Username" placeholder="Username" required="required" ref="user" autoFocus/>
                </label>
                <button type="submit" class="btn btn-primary btn-block btn-large" onClick={this.handleClick.bind(this)}>Log In</button>
            </form>
        </div>
        );
    }
}
