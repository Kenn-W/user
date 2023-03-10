window.onload = function () {
    NProgress.done();
    login()
    var sessionId=localStorage.getItem("sessionID")
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
            userId=res.data.id;
            console.log(res)
            $.ajax({
                url:"http://8.134.104.184:8078/paper/list?type=0",
                type: 'GET',
                async: false,
                headers:{
                    session:sessionId,
                },
                xhrFields: {      
                    withCredentials: true
                },  
                success: function(res) {
                    paperList=res.data;console.log(paperList);
                    $("#LAY_bloglist").html('');
                    var html="";
                    for(let i in paperList)
                    {    
                        var paper= paperList[i];  
                        html+= '<section class="article-item zoomIn article"><div class="fc-flag">'+judgeStatus(paper.status)+'</div><h5 class="title"><span class="fc-blue">'+paperJudge(paper.paperType)+'</span>'
                        +'<a href="paper.html?paperId='+ paper.id+'">'+paper.title+'</a></h5><div class="content"><p>作者:'+paper.author
                        +'</p><p>来源：《'+paper.source+'》</p><p>关键词：'+paper.tag+'</p><p>摘要：'+paper.summary+'</p></div></section>'
                    }
                    $("#LAY_bloglist").append(html);
                }
            })
        }
    })
}

function search(){
    var searchTxt=$('#searchtxt').val();
    parameters=JSON.stringify({
        "name": searchTxt,
        "sort": 0,
        "type": 2
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
        success: function(res) {
            paperList=res.data;console.log(paperList);
            $("#LAY_bloglist").html('');
            var html="";
            for(let i in paperList)
            {    
                var paper= paperList[i];  
                html+= '<section class="article-item zoomIn article"><div class="fc-flag">'+judgeStatus(paper.status)+'</div><h5 class="title"><span class="fc-blue">'+paperJudge(paper.paperType)+'</span>'
                +'<a href="paper.html?paperId='+ paper.id+'">'+paper.title+'</a></h5><div class="content"><p>作者:'+paper.author
                +'</p><p>来源：《'+paper.source+'》</p><p>关键词：'+paper.tag+'</p><p>摘要：'+paper.summary+'</p></div></section>'
            }
            $("#LAY_bloglist").append(html);
        }
    })
}

function paperJudge(num){
    if(num==0) return "【证明型】";
    if(num==1) return "【综述型】";
    if(num==2) return "【实验型】";
    if(num==3) return "【工具型】";
    if(num==4) return "【数据集型】";
}

function judgeStatus(status){
    if(status==0) return "未审核";
    if(status==1) return "已通过";
    if(status==-1) return "已拒绝";
}

function addPaper(){
    window.location.href="addPaper.html"
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