// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    path = require('path');
var passport = require('passport');

// mongoose
mongoose.connect('mongodb://localhost/csc309-a5-test');

// user schema/model
var User = require('./models/user.js');

// create instance of express
var app = express();
//app.enable('trust proxy');
require('./passport')(passport);
// require routes
var auth_routes = require('./routes/auth-api')(passport);
var default_route = require('./routes/index');
var posting_route = require('./routes/api_posting');

// define middleware

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.set('etag', false);                                                                                                                                                                                                                                   
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave : false,
    saveUninitialized : false
}));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.use(express.static(path.join(__dirname, '../client/')));
// configure passport
app.use(passport.initialize());
app.use(passport.session());




// routes
app.use('/auth/', auth_routes);
app.use('/api/post/', posting_route);
app.use('/', default_route);

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
