window.onload = function () {
    NProgress.done();
    login()
    var sessionId=localStorage.getItem("sessionID")
    parameters=JSON.stringify({
        "name": "",
        "sort": 1,
        "type": 1
})
console.log(sessionId)
$.ajax({
    url:"http://8.134.104.184:8078/search/user/condition",
    type: 'POST',
    async: false,
    headers:{
        session:sessionId,
        'Content-Type':'application/json;charset=UTF-8',
        contentType: 'application/json',
    },
    contentType: 'application/json',
    xhrFields: {      
        withCredentials: true
    },  
    data:parameters,
    crossDomain: true,     // 加上此部分
    success: function(res) {
        prgList=res.data;console.log(prgList);
        $("#LAY_bloglist").html('');
        var html="";
        for(let i in prgList)
        {    
            var prg= prgList[i];  
            html+= '<section class="article-item zoomIn article"><div class="fc-flag">'+judgeStatus(prg.status)+'</div><h5 class="title"><span class="fc-blue">'+prgJudge(prg.type)+'</span>'
            +'<a href="'+ prgGiveHref(prg.id,prg.type)+'">'+prg.name+'</a></h5><div class="content"><p>起止日期：'+prg.startTime
            +'-'+prg.deadline+'</p><p>项目介绍：'+prg.introduction+'</p></div></section>'
        }
        console.log(html)
        $("#LAY_bloglist").append(html);
    }
})
}

function prgJudge(num){
    if(num==0) return "【国创】";
    if(num==1) return "【校创】";
    if(num==2) return "【横向】";
    if(num==3) return "【纵向】";
}

function judgeStatus(status){
    if(status==0) return "未审核";
    if(status==1) return "已通过";
    if(status==-1) return "已拒绝";
}

function prgGiveHref(id,type){
    var page='1';
    if(type==2) page='2';
    if(type==3) page='3';
    return 'programme'+page+'.html?prgId='+id;
}

function addPrg(){
    window.location.href="addPrg1.html"
}

function search(){
    var searchTxt=$('#searchtxt').val();
    var sessionId=localStorage.getItem("sessionID")
    parameters=JSON.stringify({
        "name": searchTxt,
        "sort": 0,
        "type": 1
    })
    $.ajax({
        url:"http://8.134.104.184:8078/search/user/condition",
        type: 'POST',
        async: false,
        headers:{
            session:sessionId,
            'Content-Type':'application/json;charset=UTF-8',
            contentType: 'application/json',
        },
        contentType: 'application/json',
        xhrFields: {      
            withCredentials: true
        },  
        data:parameters,
        crossDomain: true,     // 加上此部分
        success: function(res) {
            prgList=res.data;console.log(prgList);
            $("#LAY_bloglist").html('');
            var html="";
            for(let i in prgList)
            {    
                var prg= prgList[i];  
                html+= '<section class="article-item zoomIn article"><div class="fc-flag">'+judgeStatus(prg.status)+'</div><h5 class="title"><span class="fc-blue">'+prgJudge(prg.type)+'</span>'
                +'<a href="'+ prgGiveHref(prg.id,prg.type)+'">'+prg.name+'</a></h5><div class="content"><p>起止日期：'+prg.startTime
                +'-'+prg.deadline+'</p><p>项目介绍：'+prg.introduction+'</p></div></section>'
            }
            console.log(html)
            $("#LAY_bloglist").append(html);
        }
    })
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