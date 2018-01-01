import React, {Component} from 'react'
import $ from 'jquery'

class Search extends Component {
    constructor(props) {
        super(props)
        this.Search = this.Search.bind(this)
    }
    Search(event) {
        event.preventDefault()
        let search_term = document.getElementById("input").value
        $.ajax({
            url: '/api/search',
            type: 'POST',
            data: {
                search_term: search_term
            },
            beforeSend: (xhr) => {
                xhr.withCredentials = true;
            },
            success: (res) => {
                console.log(res)
            },
            error: (xhr) => {
            //handles timeout error
            if (xhr.status === 0) {
                window.location.reload();
            }
            else {alert("Status: "+xhr.status+ ". "+xhr.statusText)}
        }
        })
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