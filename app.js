var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

//var exphbs = require('express-handlebars');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
//var channel = require('./routes/channel');
var detail = require('./routes/detail');

var mgtLogin = require('./routes/mgt/login');
var mgtRegister = require('./routes/mgt/register');
var mgtIndex = require('./routes/mgt/index');

var chatIndex = require('./routes/chat/index');

var app = express();

//chat�����ҵ�����
//var http = require('http').Server(app);
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//app.engine('.html', exphbs({
//  partialsDir:'views',
//  extname: '.ejs'
//}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
//app.use('/channel', channel);
app.use('/detail', detail);

app.use('/mgt/login', mgtLogin);
app.use('/mgt/register', mgtRegister);
app.use('/mgt/index', mgtIndex);

app.use('/chat/index', chatIndex);

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




//聊天室
var map ={};
var rooms={};
var idsocket ={};
io.on('connection', function(socket){
//打开页面出现的消息
//  socket.emit('news', '您好，欢迎光临-时间管理，请问有什么可以帮助您的吗？');
//  socket.on('my first event', function (data) {
//  });
//用户发送的消息
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

server.listen(3100);
module.exports = app;
