const Stocks = require('../models/stocks')
const findStock = require('./findStock')
const addStock = require('./addStock')
const dateToStr = require('./dateToStr')
const convertNYCTime = require('./convertNYCTime')

module.exports = (callback) => {
    //Update stocks if necessary
    Stocks.find({},(err,stocks) => {
        if (err) return callback({
            error: true,
            message: callback
        })
        var i=0
        while (i < stocks.length -1) {
            let stock = stocks[i]
            //function to update stock
            const updateStock = () => {
                console.log('update Stock')
                findStock(stock.ticker, (response1) => {
                    if (response1.error) return callback({
                        error: true,
                        message: 'error when updating stock'
                    })
                    addStock(response1.dataset, (response2) => {
                        if (response2.error) return callback({
                            error: true,
                            message: 'error when updating stock'
                        })
                    })
                })
            }
            //Update app's database only if it has not been updated since quandl's
            //database has been updated last time(daily 17.00 EDT)
            let stamp = new Date(stock.stamp)
            let now_NYC = convertNYCTime(new Date())
            //It's after 5 pm (stock closing time) in NYC
            if (now_NYC.getHours() >= 17) {
                let today_17_NYC = new Date(now_NYC.setHours(17, 0, 0, 0))
                //The stock's latest update was after 5 pm. No need to update
                if (stamp >= today_17_NYC) {
                    i++
                }
                //The stock's latest update was before 5pm. Update needed
                else {
                    updateStock()
                    i++
                }
            }
            //It's before 5pm in NYC
            else {
                let yesterday_17_NYC = new Date(now_NYC.setDate(now_NYC.getDate() - 1)).setHours(17, 0, 0, 0)
                //The stock's last update was after yesterday 5 pm. It's up to date
                if (stamp > yesterday_17_NYC) {
                    i++
                }
                //The stock's last update was before yesterday 5 pm. It needs updating
                else {
                    debugger
                    updateStock()
                    i++
                }
            }
        }
        //once stocks have been updated, pass them on to frontend
        Stocks.find({}, (err, stocks) => {
            if (err) return callback({
                error: true,
                message: callback
            })
            return callback(stocks)
        })
    })
}