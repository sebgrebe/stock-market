const Stocks = require('../models/stocks')

module.exports = (dataset,callback) => {
    let data = dataset.data
    let ticker = dataset.dataset_code
    let name = dataset.name
    Stocks.findOne({'ticker': ticker}, (err,stock) => {
        if (err) return callback({
                error: true,
                message: 'Saving stock to database failed'
            })
        if (!stock) {
            let dates = []
            let prices = []
            for (var i=data.length-1; i > -1; i--) {
                dates.push(data[i][0])
                prices.push(data[i][1])
            }
            let newStock = Stocks()
            newStock.ticker = ticker
            newStock.dates = dates
            newStock.name = name
            newStock.prices = prices
            debugger
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
        }
        else return callback({
            error: true,
            message: 'Stock already in database'
        })
    })
}