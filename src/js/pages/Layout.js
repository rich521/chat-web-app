import React from "react";
import { IndexLink, Link } from "react-router";

export default class Layout extends React.Component {
    render() {
        return (
            <div class="wrapper">
                {this.props.children}
            </div>
        );
    }
}
