import React, {Component} from 'react'
import socket from '../../index.js'
import Error from '../../components/main/error.js'

class Search extends Component {
    constructor(props) {
        super(props)
        this.Search = this.Search.bind(this)
    }
    Search(event) {
        event.preventDefault()
        if (this.props.state.error !== "") {this.props.setError("")}
        let ticker = document.getElementById("input").value
        let ticker_in_stocks = false
        this.props.state.stocks.map((stock) => {
            if (stock.ticker === ticker.toUpperCase()) {
                console.log(stock.ticker)
                ticker_in_stocks = true
                this.props.setError("Stock is already displayed")
            }
        })
        if (ticker_in_stocks === false) {
            this.props.updateSearching(true)
            let msg = {
                action: 'add',
                ticker: ticker
            }
            socket.send(JSON.stringify(msg))
        }
    }
    render() {
        let search_info = null
        if (this.props.state.error === "") {
            search_info = <div className="search_info"><a href="http://www.investorguide.com/stock-list.php"
                                                          target="_blank">List</a> of stock symbols</div>
        }
        if (this.props.state.searching) {
            return (
                <div className="col-sm-3 loader_box">
                    <div className="loader"></div>
                </div>
            )
        }
        else {
            return (
                <div className="search col-sm-3">
                    <div>
                        <form onSubmit={(event) => {
                            this.Search(event)
                        }}>
                            <input className="search_input" id="input" type="text" placeholder="Stock symbol"/>
                            <button>Search</button>
                        </form>
                        {search_info}
                        <Error error={this.props.state.error} setError={this.props.setError}/>
                    </div>
                </div>
            )
        }
    }
}

export default Search