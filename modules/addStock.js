const Stocks = require('../models/stocks')
const dateToStr = require('./dateToStr')
const convertNYCTime = require('./convertNYCTime')

module.exports = (dataset,callback) => {
    let data = dataset.data
    let ticker = dataset.dataset_code
    let name = dataset.name
    let stamp_NYC = convertNYCTime(new Date())
    Stocks.findOne({'ticker': ticker}, (err,stock) => {
        if (err) return callback({
                error: true,
                message: 'Saving stock to database failed'
            })
        if (stock) {stock.remove()}
        let dates = []
        let prices = []
        for (var i=data.length-1; i > -1; i--) {
            dates.push(data[i][0])
            prices.push(data[i][8])
        }
        let newStock = Stocks()
        newStock.ticker = ticker
        newStock.dates = dates
        newStock.name = name
        newStock.prices = prices
        newStock.stamp = stamp_NYC
        newStock.save((err) => {
            if (err) return callback({
                error: true,
                message: 'Failed to save stock to database'
            })
            return callback({
                error: false,
                message: 'Stock was saved to database'
            })
        })
    })
}