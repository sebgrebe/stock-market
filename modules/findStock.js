let request = require('request')

module.exports = (search_term,callback) => {
    let start_date = "2017-01-01"
    let url = 'https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker='+search_term+'&date.gt='+start_date+'&qopts.columns=ticker,date,close&api_key='+process.env.QUANDL_API_KEY
    request(url,(err,res,body) => {
      if (err) return callback({
          error: true,
          type: 'API',
          message: err
      })
      let data_table = JSON.parse(body).datatable
      if (data_table.data.length < 1) return callback({
          error: true,
          type: 'DB',
          message: 'STOCK ID not found.'
      })
      return callback({
          error: false,
          data_table: data_table
      })
    })
}