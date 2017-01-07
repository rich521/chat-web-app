import React from "react";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";

@connect((store) => {
    return {
        userObjuser: store.user.userObjuser,
        chatHistory: store.user.chatHistory
    };
})

export default class ChatRoom extends React.Component {
    // If user hasnt logged in, then redirect to log in page
    componentWillMount() {
        const { userObjuser, router } = this.props;
        if (userObjuser === "") router.push("/");
    }

    // Handle sending messages
    handleClick(event) {
        event.preventDefault();
        const { chat } = this.refs;
        if (!chat.value) return;
        userActions.sendMsg(chat.value, this.props.userObjuser);
        chat.value = "";
    }

    render() {
        const { chatHistory } = this.props;
        const val = -30; // Only load the last 30 lines of chat log

        return (
            <div class="chat-container">
                <h1>Chat Room</h1>
                <div class="chat-log">
                    <button>Show More</button>
                    <ul>
                        <li>Welcome to chat app. Type & Enter to talk to people</li>
                        {chatHistory.slice(val).map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div class="chat-input">
                    <form>
                        <label for="chat-input">Chat Input</label>
                        <input type="text" id="chat-input" name="Chat Input" required="required" ref="chat" autoFocus/>
                        <button type="submit" 
                                class="btn btn-primary btn-block btn-large" 
                                onClick={this.handleClick.bind(this)}>
                                Send
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
