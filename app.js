var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/tietok');
var data = require('./json/newData.json');

var index = require('./routes/index');
var error = require('./routes/errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.db = db;
    try {
      var testi = db.create('testi');
      testi.insert(data);
    } catch(err) {
      console.log('There was an error creating the database');
    }
    next();
});

app.use('/', index);

app.use(error);

module.exports = app;
