import React from "react";
import { connect } from "react-redux";
import { sendMsg } from "../actions/userActions";
import TopBar from "../components/TopBar";

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
        sendMsg(chat.value, this.props.userObjuser.name);
        chat.value = "";
    }

    componentDidUpdate(){
        // Scroll to the bottom
        window.scrollTo(0, this.refs.scroll.scrollHeight);
    }

    render() {
        const { chatHistory, userObjuser } = this.props;
        const val = -100; // Only load the last 100 lines of chat log

        return (
            <div class="chat-container">
                <TopBar name={userObjuser.name}/>
                <div class="chat-log">
                    <ul ref="scroll">
                        <li class="other-msg">
                            <div class="msg">
                                <h3>Admin</h3>
                                <p>Welcome to chat app. Type & Enter to talk to people</p>
                            </div>
                        </li>
                        {chatHistory.slice(val).map((item, i) => {
                            let check = (item.name === userObjuser.name)? true : false;
                            return (
                                <li key={i} class={(check)? "self-msg":"other-msg"}>
                                    <div class="msg">
                                        { (check)? <h3></h3>:<h3>{item.name}</h3>}
                                        <p>{item.msg}</p>
                                        <div>{item.date}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <form class="chat-input">
                    <label for="chat-input" class="hidden">Chat Input</label>
                    <input type="text" 
                           id="chat-input"
                           name="Chat Input" 
                           required="required"
                           ref="chat"
                           placeholder="Type here to chat"
                           autoFocus />
                    <button type="submit" 
                            class="btn-send" 
                            onClick={this.handleClick.bind(this)}>
                            Send
                    </button>
                </form>
            </div>
        );
    }
}
