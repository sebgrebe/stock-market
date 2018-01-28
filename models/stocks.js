var mongoose = require('mongoose');

// define the schema for our stocks model
var stockSchema = mongoose.Schema({
    'ticker': String,
    'name': String,
    'dates': [],
    'prices': [],
    'stamp': String
});

module.exports = mongoose.model('stocks', stockSchema);