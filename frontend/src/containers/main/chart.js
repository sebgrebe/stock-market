import { Line } from 'react-chartjs-2'
import React, { Component } from 'react'
import '../../style/stylesheet.css'
import dateToStr from '../modules/dateToStr'
import DateFields from './dateFields'
import DateMsg from '../../components/main/dateMsg'

class Chart extends Component {
    constructor(props) {
        super(props)
        var today = dateToStr(new Date())
        this.state = {
            data: {datasets: []}
        }
    }
    loadChart(state) {
        //get longest stock
        let stocks = state.stocks
        let stocks_length = []
        stocks.map((stock) => {
            stocks_length.push(stock.prices.length)
        })
        let stock_longest = stocks[stocks_length.indexOf(Math.max(...stocks_length))]
        if (stock_longest.dates[0] > state.start_date && state.date_msg.indexOf(stock_longest.dates[0]) === -1) {
            this.props.actions.setDateMsg('No data available before ' + stock_longest.dates[0])
            this.props.actions.updateDate(stock_longest.dates[0],state.end_date)
        }
        const get_arr_dates = (start_date, end_date) => {
            let arr_dates = []
            var d = new Date(start_date)
            var e = new Date(end_date)
            while (d < e) {
                if (stock_longest.dates.indexOf(dateToStr(d)) !== -1) {
                    arr_dates.push(dateToStr(d))
                }
                var day = d.getDate()
                var d_next = d.setDate(day + 1)
                d = new Date(d_next)
            }
            return arr_dates
        }
        //array of dates displayed in chart, from start_date to end_date
        let dates_chart = get_arr_dates(state.start_date, state.end_date)
        const colors = ['#e6194b', '#3cb44b', '#ffe119', '#0082c8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#d2f53c', '#fabebe', '#008080', '#e6beff', '#aa6e28', '#fffac8']
        let data_stocks = []
        stocks.map((stock, stock_i) => {
            let prices = []
            let stock_dates = stock.dates
            let stock_prices = stock.prices
            let first_stock_date = stock.dates[0]
            let last_stock_date = stock.dates[stock.dates.length - 1]
            let i = 0
            if (first_stock_date < dates_chart[0]) {
                let index = stock.dates.indexOf(dates_chart[0])
                stock_dates = stock.dates.slice(index)
                stock_prices = stock.prices.slice(index)
            }
            else if (first_stock_date > dates_chart[0]) {
                while (first_stock_date > dates_chart[i]) {
                    prices.push(undefined)
                    i++
                }
            }
            for (var j = i; j < dates_chart.length; j++) {
                prices.push(stock_prices[j - i])
            }
            if (last_stock_date < dates_chart[dates_chart.length - 1]) {
                let index = dates_chart.indexOf(last_stock_date)
                for (var k = index; k < dates_chart.length; k++) {
                    prices.push(undefined)
                }
            }
            data_stocks.push({
                label: stock['ticker'],
                pointRadius: 0,
                borderColor: colors[stock_i],
                data: prices
            })
        })
        this.setState({
            data: {
                labels: dates_chart,
                datasets: data_stocks
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let state = nextProps.state
        if (state.stocks.length > 0) {
            this.loadChart(state)
        }
        else {
            this.setState({
                data: {datasets: []}
            })
        }
    }
    render() {
        return (
            <div className="chart">
                <DateFields updateDate={this.props.actions.updateDate} state={this.props.state} loadChart={this.loadChart}/>
                <DateMsg msg={this.props.state.date_msg} setDateMsg={this.props.actions.setDateMsg} />
                <Line data={this.state.data}/>
            </div>
        )
    }
}

export default Chart