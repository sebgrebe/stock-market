import React, { Component } from 'react'
import socket from "../../index.js"

class Delete extends Component {
    constructor(props) {
        super(props)
        this.Delete = this.Delete.bind(this)
    }
    Delete(ticker) {
        var msg = {
            action: 'delete',
            ticker: ticker
        }
        socket.send(JSON.stringify(msg))
    }
    render() {
        return(
            <button className="delete_btn" onClick = {() => this.Delete(this.props.ticker)}>&#10005;</button>
        )
    }
}

export default Delete