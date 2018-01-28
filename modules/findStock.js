let request = require('request')

module.exports = (search_term,callback) => {
    let url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+search_term+'.json?api_key='+process.env.QUANDL_API_KEY
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