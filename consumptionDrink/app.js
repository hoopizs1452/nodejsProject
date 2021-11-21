var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Mongoose, mongo } = require('mongoose');

//database

//新增
// var content = new testModel({id:1, name:'user1'});

// content.save(function(err){
//   if(err) console.log(err);
//   console.log('Success!');
// });

//查詢
// testModel.find(function(err, data){
//   if(err) console.log(err);
//   console.log(data);
// });

//修改
// testModel.update({id:1},{name:'user2'}, function(err){
//   if(err) console.log(err);
//   console.log('更改成功');
// });

//刪除
// testModel.remove({id:1}, function(err){
//   if(err) console.log(err);
//   console.log('刪除成功');
// });

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
