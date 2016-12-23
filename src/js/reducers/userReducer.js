export default function reducer(state = {
    formStatus: false,
    logDetails: "",
    userObjuser: "",
    userObjpass: "",
    userObjReguser: "",
    userObjRegpass: ""
}, action) {
    var cases = {
        "FORM_STATUS": {
            ...state,
            formStatus: action.payload
        },
        "LOG_USER_USER": {
            ...state,
            userObjuser: action.payload
        },
        "LOG_USER_PASS": {
            ...state,
            userObjpass: action.payload
        },
        "LOG_DETAILS": {
            ...state,
            logDetails: action.payload
        },
        REG_USER_USER: {
            ...state,
            userObjReguser: action.payload
        },
        REG_USER_PASS: {
            ...state,
            userObjRegpass: action.payload
        }
    };

    if (cases[action.type]) return cases[action.type];

    return state;
}
