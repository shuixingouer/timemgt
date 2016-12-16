
$(function () {
    var content = $('#content');
    var status = $('#status');
    var input = $('#input');
    var num = $('#num');
    var myName = false;
    content.scrollTop = content.scrollHeight;
//建立websocket连接
    var socket = io();
//收到server的连接确认
    socket.on('open',function(){
        status.text('请选择昵称:');
    });
//监听system事件，判断welcome或者disconnect，打印系统消息信息
    socket.on('system',function(json){
        var p = '';
        if (json.type === 'welcome'){
            if(myName==json.text) status.text(myName + ': ').css('color', json.color);
            p = '<p style="text-align:center;color:'+json.color+'">system @ '+ json.time+ ' : Welcome ' + json.text +'</p>';
        }else if(json.type == 'disconnect'){
            p = '<p style="text-align:center;color:'+json.color+'">system @ '+ json.time+ ' : Bye ' + json.text +'</p>';
        }
        content.append(p);
    });

//监听message事件，打印消息信息
    socket.on('message',function(json){
        var p = '<div class="authorBox clearfix"><span class="authorImg" style="background:'+json.color+';">' + json.author + '</span>'+'<h4 class="authorInfo">' +  json.author + json.time+  '</h4>' + '<p class="authorDes"><span>' + json.text+'</span></p></div>';
        content.append(p);
        //if(json.author=status.text()){
        //    $(".authorImg").css('float','right');
        //    $(".authorInfo").css('margin','0 35px 0 0').css('text-align','right');
        //    $(".authorDes").css('margin','0 35px 0 0').css('text-align','right');
        //}
    });

//通过“回车”提交聊天信息
    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) return;
            socket.send(msg);
            $(this).val('');
            if (myName === false) {
                myName = msg;
            }
        }
    });
    $('#submit').click(function(){
        var msg = input.val();
        if (!msg) return;
        socket.send(msg);
        input.val('');
        if (myName === false) {
            myName = msg;
        }
    });
});