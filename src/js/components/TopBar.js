import React from "react";

export default (name) => {
    return (
        <div class="top-container">
            <h1>Chat App</h1>
            <div class="profile">
                <img src="./img/user.svg" alt="Profile Icon"/>
                <div>{name.name}</div>
            </div>
        </div>
    );
}
