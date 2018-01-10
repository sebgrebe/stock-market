const Stocks = require('../models/stocks')

module.exports = (callback) => {
    Stocks.find({},(err,stocks) => {
        if (err) return callback({
            error: true,
            message: callback
        })
        return callback(stocks)
    })
}