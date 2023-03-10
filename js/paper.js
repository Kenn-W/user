window.onload = function () {
    NProgress.done();
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    const url = new URL(window.location.href);
    var id = url.searchParams.get('paperId'); 
    console.log("id is",id)
    $.ajax({
        url:"http://8.134.104.184:8078/paper?paperId="+id,
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
            document.getElementById("name1").innerHTML=res.data.title;
            document.getElementById("type1").innerHTML=toTitleType(res.data.paperType);
            $('#title').val(res.data.title);
            $('#type').val(paperJudge(res.data.type));
            $('#author').val(res.data.author);
            $('#doi').val(res.data.doi);
            $('#major').val(res.data.major);
            $('#source').val(res.data.source);
            $('#summary').val(res.data.summary);
            $('#tag').val(res.data.tag);
            $('#id').val(res.data.id);
            $('#score').val(res.data.score);
            $('#publishDate').val(res.data.publishDate);
            localStorage.setItem("link",res.data.link)
        }
    })
};


function uploadInfo(){
    login()
    const url = new URL(window.location.href);
    var id = url.searchParams.get('paperId'); 
    var sessionId=localStorage.getItem("sessionID")
    var paperType=$('#paperType').val();
    var title= $('#title').val();
    var major=$('#major').val();
    var source=$('#source').val();``
    var publishDate= $('#publishDate').val();
    var summary= $('#summary').val();
    var tag= $('#summary').val();
    var formData = new FormData;
	var file = document.getElementById("file").files[0];
	formData.append("file",file);
    var doi=$('#doi').val();
    var parameters=JSON.stringify({
        "doi": doi,
        "link": "",
        "major": major,
        "paperType": paperType-1,
        "publishDate": publishDate,
        "source": source,
        "summary": summary,
        "tag": tag,
        "title": title
      })
    $.ajax({
        url:"http://8.134.104.184:8078/paper/update?paperId="+id,
        type: 'POST',
        async: false,
        headers:{
            session:sessionId,
            'Content-type':'application/json',
            contentType: 'application/json',
        },
        contentType: 'application/json',
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        data: parameters,
        success: function(result) {
            console.log(result)
            if(result.code==-1) alert("论文信息更新失败，请重试！")
            else alert("论文信息更新成功！")
        }
    })
    $.ajax({
        url:"http://8.134.104.184:8078/paper/upload?paperId="+id,
        type: 'POST',
        async: false,
        headers:{
            session:sessionId,
        },
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        contentType : false,
        processData : false,
        data:formData,
        success: function(result) {
            console.log(result)
            if(result.code==-1) alert("论文信息更新失败，请重试！")
        }
    })
}

function deletePaper(){
    const url = new URL(window.location.href);
    var id = url.searchParams.get('paperId'); 
    var sessionId=localStorage.getItem("sessionID")
    $.ajax({
        url:"http://8.134.104.184:8078/paper/deletePaper?paperId="+id,
        type: 'POST',
        async: false,
        headers:{
            session:sessionId,
        },
        contentType: 'application/json',
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        success: function(result) {
            console.log(result)
            alert("论文删除成功！")
            location.href="PaperManage.html"
        }
    })
}


function downloadFile(){
    var link=localStorage.getItem("link")
    if(link=="") alert("本论文未上传附件！")
    else{
        location.href = localStorage.getItem("link");
    }
}
function paperJudge(num){
    if(num==0) return "证明型";
    if(num==1) return "综述型";
    if(num==2) return "实验型";
    if(num==3) return "工具型";
    if(num==4) return "数据集型";
}


function toTitleType(num){
    if(num==0) return "【证明型】";
    if(num==1) return "【综述型】";
    if(num==2) return "【实验型】";
    if(num==3) return "【工具型】";
    if(num==4) return "【数据集型】";
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