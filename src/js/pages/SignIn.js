import React from "react";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";

// Main data store for handling and processing
@connect((store) => {
    return {
        formStatus: store.user.formStatus,
        logDetails: store.user.logDetails,
        userObjuser: store.user.userObjuser,
        userObjpass: store.user.userObjpass,
        userObjReguser: store.user.userObjReguser,
        userObjRegpass: store.user.userObjRegpass
    };
})

export default class SignIn extends React.Component {
    // Handle submit of user details
    handleSubmit(event) {
        // Prevent reload
        event.preventDefault();

        const { dispatch, userObj } = this.props;
        console.log(userObj.userName, userObj.passWord);
        dispatch(userActions.validateUser(userObj));
    }

    handleForm() {
        const { dispatch, formStatus } = this.props;
        console.log(formStatus);
        dispatch(userActions.changeForm(formStatus));
    }

    // Handle changes to user details
    setValue(type, event) {
        this.props.dispatch(userActions.logUser(type, event.target.value));
    }

    render() {
        const { formStatus } = this.props;

        if (formStatus) {
            const { userObjReguser, userObjRegpass } = this.props;
            console.log(userObjReguser, userObjRegpass);

            return (
                <div class="login">
                <h2>Register</h2>
                <form id="form">
                    <label for="username2">
                        Create username
                        <input type="text" id="username" name="Username2" placeholder="Username" required="required" value={userObjReguser} onChange={this.setValue.bind(this, "REG_USER_USER")}/>
                    </label>
                    <label for="password2">
                        Your Password
                        <input type="password" id="password" name="Password2" placeholder="Password" required="required" value={userObjRegpass} onChange={this.setValue.bind(this, "REG_USER_PASS")}/>
                    </label>
                    <button type="submit" class="btn btn-primary btn-block btn-large">Register</button>
                </form>
                <div><a href="#" onClick={this.handleForm.bind(this)}>Already have account?</a></div>
                { status }
            </div>
            );
        }

        if (!formStatus) {
            const { logDetails, userObjuser, userObjpass } = this.props;
            const status = <div>{ logDetails }</div>;

            // Render the main dashboard after data has been loaded
            return (
                <div class="login">
                <h2>Login</h2>
                <form id="form2" onSubmit={this.handleSubmit.bind(this)}>
                    <label for="log-username">
                        Username
                        <input type="text" id="log-username" name="Username" placeholder="Username" required="required" value={userObjuser} onChange={this.setValue.bind(this, "LOG_USER_USER")}/>
                    </label>
                    <label for="log-password">
                        Password
                        <input type="password" id="log-password" name="Password" placeholder="Password" required="required" value={userObjpass} onChange={this.setValue.bind(this, "LOG_USER_PASS")}/>
                    </label>
                    <button type="submit" class="btn btn-primary btn-block btn-large">Log In</button>
                </form>
                <div><a href="#" onClick={this.handleForm.bind(this)}>Create an account</a></div>
                { status }
            </div>
            );
        }

    }
}
