var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
mongo_pw = process.env.MONGO_PASSWORD

var db=monk('mongodb://rundb-r:' + mongo_pw +'@rundbcluster-shard-00-00-cfaei.gcp.mongodb.net:27017,rundbcluster-shard-00-01-cfaei.gcp.mongodb.net:27017,rundbcluster-shard-00-02-cfaei.gcp.mongodb.net:27017/xenon1t?ssl=true&replicaSet=RunDBCluster-shard-0&authSource=admin&retryWrites=true')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
	req.db = db;
	next();
    });

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
