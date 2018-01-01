//package dependencies
require('dotenv').config() //enables use of .env
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose')

//file dependencies
var index = require('./routes/index');
var users = require('./routes/users');

//database
var db_url = (process.env.NODE_ENV === "production") ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL
mongoose.connect(db_url)

var port = process.env.PORT || 3001;

//set up app
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    console.log('error handler')
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // put error to console
  console.log(err.status || 500);
});

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(cors({credentials: true, origin: true}))

module.exports = app;

// load routes and pass in app
require('./routes/routes.js')(app);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});
