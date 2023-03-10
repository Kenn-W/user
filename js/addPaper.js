window.onload = function () {
    NProgress.done();
    login()
};


function uploadInfo(){
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    var paperType=$('#paperType').val();
    var author=$('#author').val();
    var title= $('#title').val();
    var major=$('#major').val();
    var source=$('#source').val();
    var publishDate= $('#publishDate').val();
    var summary= $('#summary').val();
    var tag= $('#tag').val();
    var doi=$('#doi').val();
    var formData = new FormData;
	var file = document.getElementById("file").files[0];
	formData.append("file",file);
    var parameters=JSON.stringify({
            "author": author,
            "doi": doi,
            "link": "",
            "major":major,
            "paperType": paperType-1,
            "publishDate": publishDate,
            "source": source,
            "summary":summary,
            "tag":tag,
            "title": title
    })
    $.ajax({
        url:"http://8.134.104.184:8078/paper/add",
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
            $.ajax({
                url:"http://8.134.104.184:8078/paper/upload?paperId="+result.data.id,
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
                    if(result.code==-1) alert("论文信息增加失败，请重试！")
                    else 
                    {
                        alert("论文增加成功！")
                        location.href="PaperManage.html"
                    }
                }
            })
        }
    })
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