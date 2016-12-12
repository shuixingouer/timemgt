var express = require('express');
var router = express.Router();

//公共引用
var fs = require('fs'),
    path = require('path');


/* GET index page. */
router.get('/', function(req, res, next) {// 到达此路径则渲染index文件，并传出title值供 index.html使用
  res.render('index', {
    title: 'Index'
  });
});
module.exports = router;
