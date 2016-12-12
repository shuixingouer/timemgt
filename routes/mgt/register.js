var express = require('express');
var router = express.Router();
/* GET register page. */
router.route("/").get(function(req,res){// 到达此路径则渲染register文件，并传出title值供 register.html使用
  res.render("register",{title:'mgtUser Register'});
}).post(function(req,res){
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  if(uname=="111"){
    type="1";
  }else{
    type="0";
  }
  res.send(JSON.stringify({ type:type }));
  res.end();
});
module.exports = router;
