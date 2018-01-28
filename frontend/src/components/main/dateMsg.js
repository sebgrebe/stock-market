import React from 'react'

const DateMsg = ({msg,setDateMsg}) => {
    const DeleteMsg = () => {
        setDateMsg('')
    }
    if (msg === '') {
        return null
    }
    return(
        <div className="alert alert-warning date_msg">
            {msg}
            <button className="delete_btn delete_msg" onClick = {() => DeleteMsg()}>&#10005;</button>
        </div>
    )
}

export default DateMsg

