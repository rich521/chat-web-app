import io from 'socket.io-client';

// Changable variables to handle
const socketURL = "http://127.0.0.1:8080",
    errorMsg = "Failed to connect to the server",
    timeWait = 15000;

// Define the socket connection
let socket;
// Desktop variables for visibility
let hidden, visibilityChange;

export function logOutUSer() {
    return (dispatch) => dispatch({ type: "LOG_USER_USER", payload: { name: "" } });
}
// Handle the changes for user details
export function logUser(name) {
    return (dispatch) => {
        getSocketConnection()
            .then(() => dispatch({ type: "LOG_USER_USER", payload: { name: name } }))
            .then(() => {
                // Listen for chat messages
                socket.on("chat_rec", (data) => {
                    if (document[hidden]) notify(data.name, data.msg);
                    dispatch({ type: "UPDATE_CHAT", payload: data });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
// Handle validation props
export function validate(num) {
    const cases = {
        0: "Can't be a blank username",
        1: "Needs to be more than 3 characters long",
        2: "No special characters",
        3: "No internet connection"
    };

    return (dispatch) => {
        if (cases[num]) dispatch({ type: "UPDATE_VALIDATION", payload: cases[num] });
        setTimeout(() => {
            dispatch({ type: "UPDATE_VALIDATION", payload: "" });
        }, 5000)
    }

}
// Handle sending messages
export function sendMsg(msg, name) {
    socket.emit("chat_req", { name: name, msg: msg, date: getDate() });
}

// Disconnect socket
export function socketDisconnect() {
    if (socket) socket.disconnect();
}

// Handles the initial client connection
function getSocketConnection() {
    return new Promise((resolve, reject) => {
        // Connect to server 8080
        socket = io.connect(socketURL);
        // After 30s, fail connection
        const connectionTimeout = setTimeout(() => {
            reject(errorMsg);
            socket.disconnect();
        }, timeWait);
        // On connection
        socket.on("connect", () => {
            clearTimeout(connectionTimeout);
            resolve();
        });
    });
}

// Notifiction actions/permissions
if ('Notification' in window) {
    Notification.requestPermission();
    // Desktop window visible
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
}

function notify(name, body) {
    const n = new Notification(name, {
        body: body,
    });
    setTimeout(n.close.bind(n), 3000);
}

// Date function
function getDate() {
    const date = new Date(),
        hrs = date.getHours(),
        mins = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    return (hrs < 12) ? '0' + hrs + ":" + mins + ' pm' : hrs - 12 + ":" + mins + ' am';
}
