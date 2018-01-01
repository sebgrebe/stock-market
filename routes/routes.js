var findStock = require('../modules/findStock')
var saveStock = require('../modules/saveStock')

module.exports = (app) => {
    app.post('/api/search',(req,res) => {
        findStock(req.body.search_term,(response1) => {
            if (response1.error) return res.send(response1)
            saveStock(response1.data_table,(response2) => {
                console.log(response2)
                res.send(response2)
            })
        })
    })
}