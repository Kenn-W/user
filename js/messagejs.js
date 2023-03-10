window.onload = function () {
    NProgress.done();
    login()
    var sessionId=localStorage.getItem("sessionID")
    console.log(sessionId)
    $.ajax({
        url:"http://8.134.104.184:8078/message/list?type=-1",
        type: 'POST',
        headers:{
            session:sessionId,
            contentType:"application/json;charset=UTF-8",
            "Content-Type":"application/json;charset=UTF-8"
        },
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        success: function(res) {
            console.log(res);
            msgList=res.data;console.log(msgList);
            $("#message-list").html('');
            var html="";
            for(let i in msgList)
            {    
                var msg= msgList[i];  
                if(msg.status==-1){
                    html+='<li class="zoomIn article"> <div class="comment-parent"><a name="remark-1"></a><img src="https://thirdqq.qlogo.cn/qqapp/101465933/7627F745B95BFAC18C6C481FE72B4EB1/100" />'
                    +'<div class="info"><span class="username"><p style="color:red">'+msgJudge(msg.type)+'</p>管理员</span></div><div class="comment-content">'
                    +'<a href="sub-message.html?msgId='+msg.id+'&type='+msg.objectType+'&accept=0">'+msgTypeJudge(msg.objectType)+'《'+msg.objectName+'》</a></div><p class="info info-footer"><span class="comment-time">'
                    +msg.statusUpdateTime+'</span></p></div></div><hr /></li>'
                    console.log(html)
                }
                if(msg.status==1){
                    html+='<li class="zoomIn article"> <div class="comment-parent"><a name="remark-1"></a><img src="https://thirdqq.qlogo.cn/qqapp/101465933/7627F745B95BFAC18C6C481FE72B4EB1/100" />'
                    +'<div class="info"><span class="username"><p style="color:red">'+msgJudge(msg.type)+'</p>管理员</span></div><div class="comment-content">'
                    +'<a href="sub-message.html?msgId='+msg.id+'&type='+msg.objectType+'&accept=1">'+msgTypeJudge(msg.objectType)+'《'+msg.objectName+'》审核已通过！</a></div><p class="info info-footer"><span class="comment-time">'
                    +msg.statusUpdateTime+'</span></p></div></div><hr /></li>'
                    console.log(html)
                }
            }
            $("#message-list").append(html);
        }
    })
};

function msgJudge(num){
    if(num==1) return "[通知]";
    if(num==0) return "[公告]";
}

function msgTypeJudge(num){
    if (num==0) return "项目";
    if (num==1) return "论文";
}

function getSession(){
    if (window.localStorage) {
        //获取本地存储
        if(!localStorage.getItem("sessionID"))
        {
            sessionId=login()
        }
    }
}

function login(){
    $.ajax({
        url:"http://8.134.104.184:8078/user/login",
        type: 'GET',
        async: false,
        dataType: 'json',
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        data: {email:'2064672878@qq.com',password:'Zhang5201314'},
            success: function(result) {
            sessionId=result.data.sessionId;
            console.log(sessionId)
            localStorage.setItem("sessionID", sessionId);
        }
    })
}