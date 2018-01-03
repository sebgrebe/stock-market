//package dependencies
require('dotenv').config() //enables use of .env
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const server = require('http').createServer()

//file dependencies
const websokcet = require('./modules/websocket')

//database
var db_url = (process.env.NODE_ENV === "production") ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL
mongoose.connect(db_url)

var port = process.env.PORT || 8080;

//set up app
const app = express()

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

//set up websocket server
require('./modules/websocket.js')(server)

// load routes and pass in app
require('./routes/routes.js')(app);

//on http requests, load app into server
server.on('request', app)

server.listen(port, () => console.log(`listening on ${ port }`))



