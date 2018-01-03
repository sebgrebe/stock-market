import React, {Component} from 'react'
import socket from '../index.js'

class Search extends Component {
    constructor(props) {
        super(props)
        this.Search = this.Search.bind(this)
    }
    Search(event) {
        event.preventDefault()
        let search_term = document.getElementById("input").value
        socket.send(search_term)
    }
    render() {
        return (
            <div className="search">
                <form onSubmit={(event) => {this.Search(event)}}>
                    <input id="input" type="text" placeholder="Stock ID" />
                    <button>Search</button>
                </form>
            </div>
        )
    }
}

export default Search