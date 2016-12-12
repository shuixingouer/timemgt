var express = require('express');
var router = express.Router();

//公共引用
var fs = require('fs'),
    path = require('path');


/**
 * 获取url中的指定参数的值
 * @param {string} paras 待查询参数
 */
function request(url,paras){
  var s = url.substr(url.indexOf('?')+1),
      paraObj = {};
  if(s){
    var arr = s.split("&");
    for(var i = 0; i< arr.length; i++){
      var t = arr[i].split("=");
      paraObj[t[0]] = t[1];
    }
  }
  return paraObj[paras.toLowerCase()];
};


/* GET index page. */
router.get('/', function(req, res, next) {// 到达此路径则渲染index文件，并传出title值供 index.html使用
  var allArr=readName();
  var href=window.location.href;
  var hrefType = request(href,"type");
  //console.log(allArr);
  res.render('channel', {
    title: 'channel',
    data:allArr,
    hrefType:hrefType
  });
});
module.exports = router;
