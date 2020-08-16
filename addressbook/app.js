var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personsRouter = require('./routes/persons');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors()) // include before other routes
app.set('port', process.env.PORT || 3000);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/persons', personsRouter);

module.exports = app;
