import React from 'react'

const Error = ({setError,error}) => {
    if (error === "") return null
    return(
      <div className="alert alert-danger" id="alert">
          {error}
          <button className="delete_btn" onClick={() => setError("")}>&#10005;</button>
      </div>
    )
}

export default Error