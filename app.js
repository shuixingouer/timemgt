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
//WebSocket连接监听
//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;


io.on('connection', function (socket) {
  socket.emit('open');//通知客户端已连接

  // 打印握手信息
  // console.log(socket.handshake);

  // 构造客户端对象
  var client = {
    socket:socket,
    name:false,
    color:getColor()
  }

  // 对message事件的监听
  socket.on('message', function(msg){
    var obj = {time:getTime(),color:client.color};

    // 判断是不是第一次连接，以第一条消息作为用户名
    if(!client.name){
      client.name = msg;
      obj['text']=client.name;
      obj['author']='System';
      obj['type']='welcome';
      console.log(client.name + ' login');

      //返回欢迎语
      socket.emit('system',obj);
      //广播新用户已登陆
      socket.broadcast.emit('system',obj);
    }else{

      //如果不是第一次的连接，正常的聊天消息
      obj['text']=msg;
      obj['author']=client.name;
      obj['type']='message';
      console.log(client.name + ' say: ' + msg);

      // 返回消息（可以省略）
      socket.emit('message',obj);
      // 广播向其他用户发消息
      socket.broadcast.emit('message',obj);
    }
  });

  //监听出退事件
  socket.on('disconnect', function () {
    var obj = {
      time:getTime(),
      color:client.color,
      author:'System',
      text:client.name,
      type:'disconnect'
    };

    // 广播用户已退出
    socket.broadcast.emit('system',obj);
    console.log(client.name + 'Disconnect');
  });

});

var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};

var getColor=function(){
  //var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green','orange','blue','blueviolet','brown','burlywood','cadetblue'];
  var colors = ['#f75f5a','#38c2b3','#5c99f6','#78c06e','#55caf6','#5cc9f4','green', '#9489b4','#bc87cf','#f66993','#5d6cbf','#f6b330','#69c562','#f45e8b','#ed473b','#988777','#33c1b1'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
};


server.listen(3100);
module.exports = app;
