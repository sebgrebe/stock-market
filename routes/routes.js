var findStock = require('../modules/findStock')
var getAllStocks = require('../modules/getAllStocks')
var saveStock = require('../modules/addStock')

module.exports = (app) => {
    app.get('/api/stocks',(req,res) => {
        console.log('call to api/stocks')
        getAllStocks((response)=>{
            res.send(response)
        })
    })
}