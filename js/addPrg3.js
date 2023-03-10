window.onload = function () {
    NProgress.done();
};

function uploadInfo(){
    getSession()
    var sessionId=localStorage.getItem("sessionID")
    var name= $('#name').val();
    var number=$('#number').val();
    var startTime= $('#startTime').val();
    var deadline= $('#deadline').val();
    var department= $('#department').val();
    var naturalFund= $('#naturalFund').val();
    var introduction =$('#introduction').val();
    var formData = new FormData;
	var file = document.getElementById("file").files[0];
	formData.append("file",file);
    var captainName = $('#captainName').val();
    var parameters=JSON.stringify({
            "captainName": captainName,
            "cooperation": "",
            "deadline": deadline,
            "department": department,
            "file": "",
            "fund": "",
            "introduction": introduction,
            "major":"",
            "name": name,
            "naturalFund": naturalFund,
            "number": number,
            "startTime": startTime,
            "type": 3,
    })
    $.ajax({
        url:"http://8.134.104.184:8078/project/add",
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
            if(result.code==-1){
                if(result.commonErrorCode==2041)
                {
                    alert("已超过项目规定上传时间！")
                }
            }
            if(result.code!=-1){
                $.ajax({
                    url:"http://8.134.104.184:8078/project/upload?projectId="+result.data.id,
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
                        if(result.code==-1) alert("项目增加失败，请重试！")
                        else 
                        {
                            alert("项目增加成功！")
                            location.href="PrgManage.html"
                        }
                    }
                })
    
            }
            
        }
    })
}

function updateType(){
    getSession
    var sessionId=localStorage.getItem("sessionID")
    console.log(sessionId)
    var res= prompt('请输入项目想要更改的类型，【国创项目】【校创项目】【横向项目】或【纵向项目】', '例：国创项目')
    if (toNum(res)==-1) alert('输入格式有误，请重新输入！');
    if(toNum(res)==1||toNum(res)==0) window.location.href="addPrg1.html"
    if(toNum(res)==2) window.location.href="addPrg2.html"
}

function toType(num){
    if(num==0) return "国创项目";
    if(num==1) return "校创项目";
    if(num==2) return "横向项目";
    if(num==3) return "纵向项目";
    console.log(num)
}

function toTitleType(num){
    if(num==0) return "【国创】";
    if(num==1) return "【校创】";
    if(num==2) return "【横向】";
    if(num==3) return "【纵向】";
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