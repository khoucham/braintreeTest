var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var braintree = require('braintree');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkout = require('./routes/checkout');
var refund = require('./routes/refund');

const bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var dropin = require('braintree-web-drop-in');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checkout', checkout);
app.use('/refund',refund);


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
app.listen( process.env.PORT ||3000, function(){
  console.log("The server is runing on port 3000:");
})
module.exports = app;
