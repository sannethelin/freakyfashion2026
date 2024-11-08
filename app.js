var createError = require('http-errors');
var express = require('express');  // Håll denna här
var path = require('path');        // Håll denna här
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');  // Index-router som importeras

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Konfigurera Express för att servera statiska filer från "routes" mappen
app.use('/js', express.static(path.join(__dirname, 'routes')));