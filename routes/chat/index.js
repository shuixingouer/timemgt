var express = require('express');
var app = express();
var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* GET index page. */
router.get('/', function(req, res, next) {// 到达此路径则渲染index文件，并传出title值供 index.html使用
  res.render('chat/index', {
    title: 'Chat'
  });
});

module.exports = router;
