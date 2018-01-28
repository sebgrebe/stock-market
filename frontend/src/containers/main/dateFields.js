import React, { Component } from 'react'
import '../../style/stylesheet.css'
import dateToStr from '../modules/dateToStr'

let today = dateToStr(new Date())
class DateFields extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start_date: this.props.state.start_date,
            end_date: this.props.state.end_date
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            start_date: nextProps.state.start_date,
            end_date: nextProps.state.end_date
        })
    }
    update = () => {
        if (this.state.end_date > today) {
            this.setState({
                end_date: today
            })
            this.props.updateDate(this.state.start_date,today)
        }
        else if (this.state.start_date >= this.state.end_date) {
            console.log('this')
            this.setState({
                start_date: '2017-01-01',
                end_date: today
            })
             this.props.updateDate('2017-01-01',today)
        }
        else {
             this.props.updateDate(this.state.start_date,this.state.end_date)
         }

    }
    handleChange = (e,date) => {
        if (date === 'start') {
            this.setState({
                start_date: e.target.value
            })
        }
        else {
            this.setState({
                end_date: e.target.value
            })
        }
    }
    render() {
        return (
            <div className="date_fields">
                <input id="start_date" className="date_field" type="date" value={this.state.start_date} onChange={(e) => this.handleChange(e, 'start')}></input>
                <input id="end_date" className="date_field" type="date" value={this.state.end_date} onChange={(e) => this.handleChange(e, 'end')}></input>
                <button onClick={() => this.update()}>Update</button>
            </div>
        )
    }
}

export default DateFields