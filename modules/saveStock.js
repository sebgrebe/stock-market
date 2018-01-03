const Stocks = require('../models/stocks')

module.exports = (data_table,callback) => {
    let data = data_table.data
    let ticker = data[0][0]
    Stocks.findOne({'ticker': ticker}, (err,stock) => {
        if (err) return callback({
                error: true,
                message: 'Saving stock to database failed'
            })
        if (!stock) {
            let newStock = Stocks()
            newStock.ticker = ticker
            newStock.prices = data

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