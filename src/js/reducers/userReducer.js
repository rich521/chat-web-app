export default function reducer(state = {
    userObjuser: "",
    chatHistory: [],
}, action) {
    var cases = {
        "LOG_USER_USER": {
            ...state,
            userObjuser: action.payload
        },
        "UPDATE_CHAT": {
            ...state,
            chatHistory: [...state.chatHistory, action.payload]
        }
    };

    if (cases[action.type]) return cases[action.type];

    return state;
}
