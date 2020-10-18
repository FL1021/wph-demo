// 获取元素
var username = document.getElementById("username");
var password = document.getElementById("password");
var password1 = document.getElementById("password1");

var usernameTips = document.getElementById("usernameTips");
var passwordTips = document.getElementById("passwordTips");
var password1Tips = document.getElementById("password1Tips");

var submitBtn = document.getElementById("submitBtn");
var yz_btn = document.querySelector('.inp-fr');
var rule = document.getElementById('rule')
let isChecked = rule.checked;  
// 定义两个锁，为了点击注册btn时知道此时上面的状态
var username_lock = false;
var password_lock = false;
// console.log(isChecked);
//验证按钮
yz_btn.onclick = function(){
    yz_btn.style.color = '#999999'
    yz_btn.style.background = '#D0D0D0'
}
// 验证手机号 
username.onblur = function () {
    // 获取用户输入的名字
    var text = username.value;
    // 正则验证
    // var reg = /^[^\d]\w{3,13}$/;
    var reg = /1(31|32|34|35|36|37|38|39|50|57|58|86|87|88)[0-9]{8}/g;
    // 验证
    var result = reg.test(text);
    usernameTips.innerHTML = result ? "" : "手机号格式不正确";
    usernameTips.style.color = result ? "" : "red";
    // 判定是否正确 如果正确继续下一道验证 如果错误 停止执行
    if (!result) {
        username_lock = false;
        return;
    }

    // 发送ajax请求 检测这个用户名是否可以使用
    $.ajax({
        url: '../php/checkname.php',
        data:{
            username: text, 
            
        },
       
        type: "get",
        dataType: "json",
        success(data) {
            // 请求成功时 
            console.log(data);
            if(!data.error){
                //  username_lock = true;
                 usernameTips.innerHTML = "√该手机号可以使用";
                 usernameTips.style.color = "green";

            }
            else{
                // username_lock = false;
                usernameTips.innerHTML = "×该手机号已注册";
                usernameTips.style.color = "red";
            }
           
            
        },
        error(data) {
            // 请求失败时
            console.log(data)
            
        }
      
    })
    // 原生发Ajax
    // QF.get('../php/checkname.php', { username: text }, function (data) {
    //     console.log(data)
    //     // 根据结果提示用户
    //     if (!data.error) {
    //         username_lock = true;
    //         usernameTips.innerHTML = "√";
    //         usernameTips.style.color = "green";
    //     } else {

            // username_lock = false;
            // usernameTips.innerHTML = "×";
            // usernameTips.style.color = "red";
    //     }
    // })

}


password.onfocus = function () {
    password1.value = "";
    password1Tips.innerHTML = "";
}
// 验证密码
password.onblur = function () {

    // 获取用户输入的密码
    var val = password.value;
    // 定义正则表达式 
    // var reg = /^\w{3,16}$/;
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g;
    // 使用正则验证输入的值 如果符合提示用户输入正确 如果不符合提示用户输入错误
    passwordTips.innerHTML = reg.test(val) ? "√该密码可使用" : "×请输入正确格式的密码";
    // passwordTips.style.color = reg.test(val) ? "red" : "blue";

}

password1.onblur = function () {
    // 获取密码的第一次输入
    var val = password.value;
    // 获取密码的第二次输入
    var val1 = password1.value;

    // 定义正则表达式 
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/g;

    if (!reg.test(val1)) {
        // password_lock = false;
        password1Tips.innerHTML = "×请输入正确格式的密码";
        // password1Tips.style.color = "red";
        return;
    }

    password1Tips.innerHTML = val === val1 ? "√该密码可使用" : "×两次输入的密码不一致";
    // password1Tips.style.color = val === val1 ? "green" : "red";
    password_lock = val === val1;
}

//  // 条约勾选
// rule.onchange = function () {
   
//     let isChecked = this.checked;       
//     // 判定
//     if (isChecked) {
//         console.log(111)
//     } else {
//         alert('请同意条约')
//         return;
//     }
   
// }
submitBtn.onclick = function () {
    // if (!(username_lock && password_lock)) {
    //     alert("请重新检查")
    //     return;
    // }
   
    // 获取用户名 
    var user = username.value;
    // 获取密码
    var pass = password.value;
    // 发送ajax到注册接口
    // console.log(user)
    // console.log(pass)
    // panel.style.display = "block";
    // 弹出一个面板 这个面板中就一个loading图
    $.ajax({
        url: '../php/regist.php',
        data:{
            username: user, 
            password: pass,
            
        },             
        type: "get",
        dataType: "json",
        success(data) {
            // 请求成功时 
            // console.log(data);
            setTimeout(function () {
                    if(rule.checked) {
                          location.href = "../index.html"
                    }   
                    else{
                        alert('请阅读并同意条约');
                        return;
                    }
              
            }, 500)
            
        },
        error(data) {
            // 请求失败时
            // console.log(data)
            alert(data.msg);
        }
      
    })
}
    // QF.post("../php/regist.php", { username: user, password: pass }, function (data) {
    //     console.log(data)
    //     if (!data.error) {
    //         // panel.style.display = "none";
    //         setTimeout(function () {
    //             location.href = "../index.html"
    //         }, 500)
    //     } else {
    //         alert(data.msg);
    //     }
    // })




    // 演示 超时
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    // }
    // // 设置超时时间
    // xhr.timeout = 6000;
    // // 设置超时事件
    // xhr.ontimeout = function() {
    //     console.log("超时了")
    // }
    // xhr.open("post", "timeout.php", true);
    // xhr.send()  
    // setInterval(function() {
    //     console.log(1);
    // }, 1000);
//}