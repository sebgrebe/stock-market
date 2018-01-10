import { Line } from 'react-chartjs-2'
import React from 'react'
import '../../style/stylesheet.css'

const Chart = ({stocks}) => {
    let data = {datasets: []}
    if (stocks.length > 0) {
        let start_date = "2017-01-04"
        let end_date = "2018-01-05"
        const date_to_str = (date) => {
            let year = date.getFullYear()
            let month = (date.getMonth() < 9) ? '0'+ (date.getMonth()+1).toString() : (date.getMonth()+1).toString()
            let day = (date.getDate() < 10) ? '0'+ date.getDate().toString() : date.getDate().toString()
            return year+"-"+month+"-"+day
        }
        const get_arr_dates = (start_date,end_date) => {
            let arr_dates = []
            var d = new Date(start_date)
            var e = new Date(end_date)
            while (d < e) {
                arr_dates.push(date_to_str(d))
                var day = d.getDate()
                var d_next = d.setDate(day+1)
                d = new Date(d_next)
            }
            return arr_dates
        }
        let stocks_length = []
        stocks.map((stock) => {
            stocks_length.push(stock.prices.length)
        })
        let stock_longest = stocks[stocks_length.indexOf(Math.max(...stocks_length))]
        let dates_chart = get_arr_dates(start_date,end_date)
        let earlier = []
        let l = 0
        while (stock_longest.dates[0] > dates_chart[l]) {
            earlier.push(dates_chart[l])
            l++
        }
        dates_chart = earlier.concat(stock_longest.dates)
        const colors = ['#e6194b','#3cb44b','#ffe119','#0082c8','#f58231','#911eb4','#46f0f0','#f032e6','#d2f53c','#fabebe','#008080','#e6beff','#aa6e28','#fffac8']
        let data_stocks = []
        stocks.map((stock) => {
            let prices = []
            let stock_dates = stock.dates
            let stock_prices = stock.prices
            let first_stock_date = stock.dates[0]
            let last_stock_date = stock.dates[stock.dates.length - 1]
            let i = 0
            if (first_stock_date < dates_chart[0]) {
                let index = stock.dates.indexOf(dates_chart[0])
                console.log(index)
                stock_dates = stock.dates.slice(index)
                stock_prices = stock.prices.slice(index)
            }
            else if (first_stock_date > dates_chart[0]) {
                while (first_stock_date > dates_chart[i]) {
                    prices.push(undefined)
                    i++
                }
            }
            console.log(stock_dates)
            for (var j = i; j < dates_chart.length; j++) {
                prices.push(stock_prices[j - i])
            }
            if (last_stock_date < dates_chart[dates_chart.length - 1]) {
                let index = dates_chart.indexOf(last_stock_date)
                for (var k = index; k < dates_chart.length; k++) {
                    prices.push(undefined)
                }
            }
            console.log(prices)
            data_stocks.push({
                label: stock['ticker'],
                pointRadius: 0,
                borderColor: colors[i],
                data: prices
            })
        })
        data = {
            labels: dates_chart,
            datasets: data_stocks
        }
    }
    return(
        <div className="chart">
            <Line data={data} />
        </div>
    )
}

export default Chart