import React from 'react'
import $ from "jquery";
import Stocks from "../../components/main/stocks"
import Search from "./search"
import Chart from "./chart"
import socket from "../../index.js"
import { Component } from "react"

class Data extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        socket.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data)
            console.log(event)
            if (msg.message === "update") {
                this.getStocks()
            }
            else {
                this.props.actions.setError(msg.message)
                this.props.actions.updateSearching(false)
            }
        })
        if (Object.values(this.props.state.stocks).length === 0) {
            this.getStocks()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.state.stocks.length !== nextProps.state.stocks.length) {
            this.props.actions.updateSearching(false)
        }
    }
    getStocks() {
        $.ajax({
            url: '/api/stocks',
            type: 'GET',
            success: (res) => {
                console.log(res)
                this.props.actions.updateStocks(res)
            },
            error: (xhr) => {
                //handles timeout error
                this.props.actions.updateSearching(false)
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
                <Chart state={this.props.state} actions={this.props.actions} />
                <div className="row">
                    <Search state={this.props.state} setError={this.props.actions.setError} updateSearching={this.props.actions.updateSearching}/>
                    <Stocks stocks={this.props.state.stocks} update={this.props.actions.updateStocks}/>
                </div>
            </div>
        )
    }
}

export default Data