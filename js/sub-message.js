window.onload=function(e){
    NProgress.done();
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    const url = new URL(window.location.href);
    var id = url.searchParams.get('msgId'); 
    var type = url.searchParams.get('type'); 
    var accept = url.searchParams.get('accept'); 
    console.log(type)
    $.ajax({
        url:"http://8.134.104.184:8078/message?messageId="+id,
        type: 'GET',
        dataType: 'json',
        headers:{session:sessionId,contentType:'application/json',},
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        contentType:'application/json',
        success: function(res) {
            console.log(res);
            msg=res.data;
            $("#content").html('');
            var html="";
            console.log(msgTypeJudge(type))
            if (accept==0)
            {
                html+='<p style="font-size:1.2rem;">'+msgTypeJudge(type)+'请修改后重新提交。管理员审批意见如下:<br>'
                +msg+'</p>';
            }
            else {
                html+='<p style="font-size:1.2rem;">'+msgTypeJudge(type)+'已被接受！</p>';
            }
            $("#content").append(html);
        }
    })
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
    var email=localStorage.getItem("email");
    var pwd=localStorage.getItem("pwd");
    $.ajax({
        url:"http://8.134.104.184:8078/user/login",
        type: 'GET',
        async: false,
        dataType: 'json',
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        data: {email:email,password:pwd},
        success: function(result) {
            sessionId=result.data.sessionId;
            console.log(sessionId)
            localStorage.setItem("sessionID", sessionId);
        }
    })
}