import React from "react";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";

// Main data store for handling and processing
@connect((store) => {
    return {
        userObjuser: store.user.userObjuser,
        validation: store.user.validation
    };
})

export default class SignIn extends React.Component {
    // Handle submit of user details
    handleClick(event) {
        // Prevent reload
        event.preventDefault();
        const { dispatch } = this.props;
        const { user } = this.refs;
        const uval = user.value;

        if (!navigator.onLine) {
            dispatch(userActions.validate(3));
            return;
        }

        if (!uval) {
            dispatch(userActions.validate(0));
            return;
        }

        if (uval.length < 3) {
            dispatch(userActions.validate(1));
            return;
        }

        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(uval)) {
            dispatch(userActions.validate(2));
            return;
        }

        dispatch(userActions.logUser(user.value));
        user.value = "";
    }

    componentWillMount() {
        this.props.dispatch(userActions.logOutUSer());
        userActions.socketDisconnect();
    }

    // After successful login
    componentWillUpdate(nextProps) {
        if (nextProps.userObjuser.name !== "") {
            this.props.router.push("chatroom");
        }
    }

    render() {
        const { validation } = this.props;
        // Render the main dashboard after data has been loaded
        return (
            <div class="login-container">
                <h1>Chat App Example</h1>
                <form>
                    <h2>Login</h2>
                    <label for="log-username" class="hidden">Username</label>
                    <input type="text" 
                               class="input" 
                               id="log-username" 
                               name="Username" 
                               placeholder="Enter anyname" 
                               required="required" 
                               ref="user" 
                               autoFocus
                               maxLength="10"/>
                    <button type="submit" 
                            class="btn" 
                            onClick={this.handleClick.bind(this)}>
                            Log In
                    </button>
                    <span class="validation">{validation}</span>
                </form>
            </div>
        );
    }
}
