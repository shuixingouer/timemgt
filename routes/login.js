var express = require('express');
var router = express.Router();



//var pg = require('pg');
//var conString = "tcp://dbxff:qwer1234@127.0.0.1:5432/timedb";
//var conString = "tcp://dbxff:qwer1234@127.0.0.1:5432/timedb";
//var conString = "tcp://dbxff:qwer1234@127.0.0.1:5432/timedb";






/* GET login page. */
router.route("/").get(function(req,res){// 到达此路径则渲染login文件，并传出title值供 login.html使用
  res.render("login",{title:'User Login'});
}).post(function(req,res){// 从此路径检测到post方式则进行post数据的处理操作
  //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
  //var User = global.dbHandel.getModel('user');
  var uname = req.body.uname;
  var upwd = req.body.upwd;

  var pg = require('pg');
  var conString = "postgres://dbxff:qwer1234@127.0.0.1:5432/timedb";

  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var str = "select name from time_user where name='"+uname+"' AND password= '"+upwd+"';";
    console.log(str);
    client.query(str, function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].name);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });

  if(uname=="111"&&upwd=="123456"){
    type="1";
  }else{
    type="0";
  }

  res.send(JSON.stringify({ type:type }));
  res.end();
});
module.exports = router;
