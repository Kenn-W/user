window.onload=function(e){
    login()
    var sessionId=localStorage.getItem("sessionID")
    $.ajax({
        url:"http://8.134.104.184:8078/homepage/project",
        type: 'GET',
        dataType: 'json',
        headers:{session:sessionId},
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        contentType:'application/json',
        success: function(res) {
            prgList=res.data;console.log(prgList);
            for(var i=0;i<(prgList.length>2?3:prgList.length);i++)
            {
                var html="";
                var prg= prgList[i];  
                var count='prg'+(i+1+'');
                console.log(count)
                $("#"+count).html('');
                html+= '<h4><a href="'+prgGiveHref(prg.id,prg.type)+'">'+prg.name+'</a></h4>'+'<div class="date">'+prgJudge(prg.type)+'</div>'
                +'<p>'+prg.introduction+'</p>'+'<div class="date">项目评分：'+prg.score+'</div>'
                +'<a href="'+prgGiveHref(prg.id,prg.type)+'" class="btn">点击查看详情</a>'
                $("#"+count).append(html);
            }
        }
    })
    $.ajax({
        url:"http://8.134.104.184:8078/homepage/message",
        type: 'GET',
        dataType: 'json',
        headers:{session:sessionId},
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        contentType:'application/json',
        success: function(res) {
            msgList=res.data;console.log(msgList);
            var cnt=0;
            for(var i=0;i<msgList.length&&cnt<=3;i++)
            {
                var html="";
                var msg= msgList[i];  
                console.log(count)
                if(msg.status==1)
                {
                    var count='msg'+(cnt+1+'');
                    cnt=cnt+1;
                    html+= '<a href="sub-message.html?msgId='+msg.id+'&type='+msg.objectType+'&accept=1">'+'<span style="color:salmon">'+msgJudge(msg.type)+'</span>'+'《'+msg.objectName
                    +'》审核已通过！'+'</a>'
                    $("#"+count).html('');
                    $("#"+count).append(html);
                }
                if(msg.status==-1)
                {
                    var count='msg'+(cnt+1+'');
                    cnt=cnt+1;
                    html+= '<a href="sub-message.html?msgId='+msg.id+'&type='+msg.objectType+'&accept=0">'+'<span style="color:salmon">'+msgJudge(msg.type)+'</span>'+'《'+msg.objectName
                    +'》审核已被拒绝！'+'</a>'
                    console.log(html)
                    $("#"+count).html('');
                    $("#"+count).append(html);
                }
            }
        }
    })
    $.ajax({
        url:"http://8.134.104.184:8078/homepage/paper",
        type: 'GET',
        dataType: 'json',
        headers:{session:sessionId},
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        contentType:'application/json',
        success: function(res) {
            paperList=res.data;console.log(paperList)
            console.log("paperList is",paperList)
            for(var i=0;i<(paperList.length>2?3:paperList.length);i++)
            {
                var html="";
                var paper= paperList[i];  
                var count='paper'+(i+1+'');
                console.log(count)
                $("#"+count).html('');
                html+= '<h4><a href="paper.html?paperId='+paper.id+'"class="title">'+paper.title+'</a></h4><div class="date">作者：'+paper.author+'</div><p>'
                +paper.summary+'</p>'+'<div class="date">论文评分：'+paper.score+'</div><a href="paper.html?paperId='+paper.id+'" class="btn">点击查看详情</a>'
                $("#"+count).append(html);
            }
        }
    })
    $.ajax({
        url:"http://8.134.104.184:8078/user/info",
        type: 'GET',
        dataType: 'json',
        headers:{session:sessionId},
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        contentType:'application/json',
        success: function(res) {
            console.log(res);
            nickName=res.data.nickname;
            signature=res.data.tag
            $("#nickName").html('');
            $("#nickName").append(nickName);
            $("#nickName2").html('');
            $("#nickName2").append(nickName);
            $("#signature").html('');
            $("#signature").append(signature);
            $("#signature2").html('');
            $("#signature2").append(signature);


        }
    })
}

function prgJudge(num){
    if(num==0) return "国创项目";
    if(num==1) return "校创项目";
    if(num==2) return "横向项目";
    if(num==3) return "纵向项目";
}

function msgJudge(num){
    if(num==1) return "[通知]";
    if(num==0) return "[公告]";
}

function prgGiveHref(id,type){
    var page='1';
    if(type==2) page='2';
    if(type==3) page='3';
    return 'programme'+page+'.html?prgId='+id;
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