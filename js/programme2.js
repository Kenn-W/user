window.onload = function () {
    NProgress.done();
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    const url = new URL(window.location.href);
    var id = url.searchParams.get('prgId'); 
    $.ajax({
        url:"http://8.134.104.184:8078/project?projectId="+id,
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
            document.getElementById("name1").innerHTML=res.data.name;
            document.getElementById("type1").innerHTML=toTitleType(res.data.type);
            $('#name').val(res.data.name);
            $('#type').val(toType(res.data.type));
            $('#cooperation').val(res.data.cooperation);
            $('#department').val(res.data.department);
            $('#fund').val(res.data.fund);
            $('#number').val(res.data.number);
            $('#startTime').val(res.data.startTime);
            $('#deadline').val(res.data.deadline);
            $('#captainName1').val(res.data.captainName);
            $('#introduction').val(res.data.introduction);
            html=res.data.captainName;
            $("#captainName").append(html);
            $("#uploadTime").append(res.data.uploadTime);
            $("#score").val(res.data.score);
            localStorage.setItem("link",res.data.file)
        }
    })
};

function downloadFile(){
    var link=localStorage.getItem("link")
    if(link=="") alert("本项目未上传附件！")
    else{
        location.href = localStorage.getItem("link");
    }
}

function deletePrg(){
    const url = new URL(window.location.href);
    var id = url.searchParams.get('prgId'); 
    var sessionId=localStorage.getItem("sessionID")
    $.ajax({
        url:"http://8.134.104.184:8078/project/deleteProject?projectId="+id,
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
            alert("项目删除成功！")
            location.href="PrgManage.html"
        }
    })
}

function uploadInfo(){
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    var name= $('#name').val();
    var major=$('#major').val();
    const url = new URL(window.location.href);
    var id = url.searchParams.get('prgId'); 
    var startTime= $('#startTime').val();
    var deadline= $('#deadline').val();
    var introduction =$('#introduction').val();
    var cooperation =$('#cooperation').val();
    var department =$('#department').val();
    var captainName1= $('#captainName1').val();
    var fund=$('#fund').val();
    var number=$('#number').val();
    var formData = new FormData;
	var file = document.getElementById("file").files[0];
	formData.append("file",file);
    var parameters=JSON.stringify({
        "captainName": captainName1,
        "cooperation": cooperation,
        "deadline": deadline,
        "department": department,
        "file": "",
        "fund": fund,
        "introduction": introduction,
        "major": major,
        "name": name,
        "naturalFund": "",
        "number": number,
        "startTime": startTime,
        "uploadTime": "",
    })
    $.ajax({
        url:"http://8.134.104.184:8078/project/update?projectId="+id,
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
            if(result.code==-1) alert("项目信息更新失败，请重试！")
            if(result.code==0) 
            {
                $.ajax({
                    url:"http://8.134.104.184:8078/project/upload?projectId="+id,
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
                        if(result.code==-1) alert("项目信息更新失败，请重试！")
                        if(result.code==0) 
                        {
                            alert("项目更新成功！")
                        }
                        
                    }
                })
            }
        }
    })
}

function updateType(){
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    console.log(sessionId)
    const url = new URL(window.location.href);
    var id = url.searchParams.get('prgId'); 
    var res= prompt('请输入项目想要更改的类型，【国创项目】【校创项目】【横向项目】或【纵向项目】', '例：国创项目')
    if (toNum(res)==-1) alert('输入格式有误，请重新输入！');
    else{
        $.ajax({
            url:"http://8.134.104.184:8078/project/updateType?projectId="+id+"&type="+toNum(res),
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
                alert("项目类型转化成功！请重新进入该项目！")
                location.href="PrgManage.html"
            }
        })
    }
}

function toType(num){
    if(num==0) return "国创项目";
    if(num==1) return "校创项目";
    if(num==2) return "横向项目";
    if(num==3) return "纵向项目";
}

function toNum(str){
    if(str=="国创项目") return 0;
    if(str=="校创项目") return 1;
    if(str=="横向项目") return 2;
    if(str=="纵向项目") return 3;
    return -1;
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


function toTitleType(num){
    if(num==0) return "【国创】";
    if(num==1) return "【校创】";
    if(num==2) return "【横向】";
    if(num==3) return "【纵向】";
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