import { combineReducers } from "redux";

import user from "./userReducer";
import socket from "./socketReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    socket,
    user,
    routing: routerReducer,
});
