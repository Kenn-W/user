window.onload=function(e){
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
            console.log(res);
            document.getElementById('userName').value=res.data.nickname
            var radio="input[name='sex'][value="+res.data.gender+"]"
            $(radio).attr("checked",true); 
            document.getElementById('email').value=res.data.email
            document.getElementById('tag').value=res.data.tag
            $("#signature").html('');
            $("#signature").append(res.data.tag);
            document.getElementById('projectNum').value=res.data.projectNum
            document.getElementById('paperNum').value=res.data.paperNum
            $('#datePicker').val(res.data.birth);
        }
    })
}

function goPrg(){
    window.location.href="PrgManage.html";
}

function goPaper(){
    window.location.href="PaperManage.html";
}

function infoChange(){
    login()
    var sessionId=localStorage.getItem("sessionID")
    var userName= document.getElementById('userName').value
    var birthday= $('#datePicker').val()
    console.log(birthday)
    var tag=  document.getElementById('tag').value
    var sex= parseInt($("input[name='sex']:checked").val());
    var parameters=JSON.stringify({"nickname":userName,"birth":birthday,"gender":sex,"tag":tag})
    console.log(userName,birthday,tag,sex)
        $.ajax({
            url:"http://8.134.104.184:8078/user/update",
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
                alert("修改成功！")
            }
        })
}

function pwdChange(){
    var sessionId=localStorage.getItem("sessionID")
    var pwd= document.getElementById('pwd').value
    var pwd2= document.getElementById('pwd2').value
    if (pwd!=pwd2){
        alert ("两次输入密码不一致！")
    }
    else if (pwd=="")
    {
        alert("请勿输入空密码！")
    }
    else {
        $.ajax({
            url:"http://8.134.104.184:8078/user/password",
            type: 'POST',
            async: false,
            headers:{session:sessionId},
            dataType: 'json',
            xhrFields: {      
                withCredentials: true
            },  
            crossDomain: true,     // 加上此部分
            data: {password:pwd},
            success: function(result) {
                console.log(result)
                if(result.code==-1)
                {
                    alert("请输入更复杂的密码！")
                }
                else
                {
                    alert("修改密码成功！")
                    localStorage.setItem("pwd", pwd);

                }
            }
        })
    }
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

function logout(){
    var sessionId=localStorage.getItem("sessionID")
    $.ajax({
        url:"http://8.134.104.184:8078/user/logout",
        type: 'POST',
        async: false,
        dataType: 'json',
        headers:{session:sessionId},
        xhrFields: {      
            withCredentials: true
        },  
        crossDomain: true,     // 加上此部分
        success: function(result) {
            console.log(result)
            location.href="http://8.134.104.184:8080/0.9/register.html"
        }
    })
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