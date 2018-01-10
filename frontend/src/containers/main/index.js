import React from 'react'
import $ from "jquery";
import Stocks from "../../components/main/stocks"
import Search from "./search"
import Chart from "../../components/main/chart"
import socket from "../../index.js"
import { Component } from "react"

class Data extends Component {
    constructor(props) {
        super(props)
        this.getStocks = this.getStocks.bind(this)
    }
    componentDidMount() {
        socket.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data)
            if (msg.message === "update") {
                this.getStocks()
            }
            else {
                this.props.actions.setError(msg.message)
            }
        })
        this.getStocks()
    }
    getStocks() {
        $.ajax({
            url: '/api/stocks',
            type: 'GET',
            success: (res) => {
                this.props.actions.updateStocks(res)
            },
            error: (xhr) => {
                //handles timeout error
                if (xhr.status === 0) {
                    window.location.reload();
                }
                else {
                    alert("Status: " + xhr.status + ". " + xhr.statusText)
                }
            }
        })
    }
    render() {
        return(
            <div className="main">
                <Chart stocks={this.props.state.stocks} />
                <div className="row">
                    <Search error={this.props.state.error} setError={this.props.actions.setError}/>
                    <Stocks stocks={this.props.state.stocks} update={this.props.actions.updateStocks}/>
                </div>
            </div>
        )
    }
}

export default Data