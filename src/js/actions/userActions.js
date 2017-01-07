import io from 'socket.io-client';

// Changable variables to handle
const socketURL = "http://localhost:8080",
    errorMsg = "Failed to connect to the server",
    timeWait = 15000;

// Define the socket connection
let socket;

// Handles the initial client connection
const getSocketConnection = () => {
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
};

// Handle the changes for user details
export function logUser(name) {
    return (dispatch) => {
        getSocketConnection()
            .then(() => dispatch({ type: "LOG_USER_USER", payload: { name: name } }))
            .then(() => {
                // Listen for chat messages
                socket.on("chat_rec", (msg) => dispatch({ type: "UPDATE_CHAT", payload: msg }));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// Handle sending messages
export function sendMsg(msg, name) {
    socket.emit("chat_req", msg);
}
