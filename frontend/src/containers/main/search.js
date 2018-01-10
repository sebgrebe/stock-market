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
        if (this.props.error !== "") {this.props.setError("")}
        let ticker = document.getElementById("input").value
        let msg = {
            action: 'add',
            ticker: ticker
        }
        socket.send(JSON.stringify(msg))
    }
    render() {
        let search_info = null
        if (this.props.error === "") {
            search_info = <div className="search_info"><a href="http://www.investorguide.com/stock-list.php"
                                                          target="_blank">List</a> of stock symbols</div>
        }
        return (
            <div className="search col-sm-3">
                <div>
                <form onSubmit={(event) => {this.Search(event)}}>
                    <input className="search_input" id="input" type="text" placeholder="Stock symbol" />
                    <button>Search</button>
                </form>
                {search_info}
                <Error error={this.props.error} setError={this.props.setError}/>
                </div>
            </div>
        )
    }
}

export default Search