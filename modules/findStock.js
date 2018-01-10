let request = require('request')

module.exports = (search_term,callback) => {
    console.log(search_term)
    let start_date = "2017-01-01"
    let url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+search_term+'.json?column_index=4&api_key='+process.env.QUANDL_API_KEY
    request(url,(err,res,body) => {
      if (err) return callback({
          error: true,
          message: 'Couldn\'t search in database: '+err
      })
      let body_json = JSON.parse(body)
      if (body_json.quandl_error) return callback({
          error: true,
          message: 'Stock symbol not found.'
      })
      else {
          let dataset = body_json.dataset
          return callback({
              error: false,
              dataset: dataset
          })
      }
    })
}