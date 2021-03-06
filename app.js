var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LYAPI = require('lvyii_api')

const appInfo = {
  appName: 'Lvyii_Demo',
  uploader: {
    provider: 'qiniu',
    AK: 'zT547Cjvf4LwGcx9HPkIttmEQ1sgio7CPhmRKnc9',
    SK: 'HizfstSiHrUczcAn0ug89CFgByNi19Chw2pcVGHD',
    bucket: 'lvyii-dev01',
    region: 'z2',
    bindDomain: 'http://p1me48h1j.bkt.clouddn.com'
  },
  sms: {
    provider: "qcloudsms",
    appId: "1400077093",
    appKey: "45a725e82703b9b1ac98676278f1804e",
    sign: "小吉网络"
  }
};

LYAPI.init(appInfo);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(LYAPI.express())

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
