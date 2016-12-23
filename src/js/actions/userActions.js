import axios from "axios";

// Timeout variable
const timeOut = 3000,
    beforeLog = "Signing in...",
    afterLog = "Failed to login";

// Handle the changes for user details
export function logUser(type, value) {
    return (dispatch) => dispatch({ type: type, payload: value });
}

// Validate the user details with server
export function validateUser(userObj) {
    return (dispatch) => {
        dispatch({ type: "LOG_DETAILS", payload: beforeLog });
        axios({
                method: 'post',
                url: '/loguser',
                data: {
                    "userName": userObj.userName,
                    "passWord": userObj.passWord
                }
            }).then((response) => {
                if (!response.data) dispatch({ type: "LOG_DETAILS", payload: afterLog });
                // setTimeout(() => {
                //     dispatch({ type: "LOG_DETAILS", payload: "" });
                // }, timeOut);
            })
            .catch((error) => console.log(error));
    }
}

export function changeForm(arg) {
    return (dispatch) => {
        let status = (arg) ? false : true;
        console.log(arg, status);
        dispatch({ type: "FORM_STATUS", payload: status });
    }
}
