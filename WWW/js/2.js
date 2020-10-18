
; (function () {
    let usernameInp = document.getElementById("username");
    let passwordInp = document.getElementById("password");
    // let remenberInp = document.getElementById("remember");
    let loginBtn = document.getElementById("loginBtn");
    // 获取本地存储的信息 
    let userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo) {
        let { username, password, isRemenber } = userinfo;
        usernameInp.value = username;
        passwordInp.value = password;
        remenberInp.checked = isRemenber;
    }




    // 定义用户名和密码锁
    let username_lock = false;
    let password_lock = false;

    // 用户名验证正则
    usernameInp.onblur = function () {    
        let val = this.value;       
        let reg = /^\w{1,12}$/;    
        if (reg.test(val)) {
            username_lock = true;
            this.style.borderColor = "green";
        } else {
            username_lock = false;
            this.style.borderColor = "red"
        }
    }


    // 密码验证正则
    passwordInp.onblur = function () {      
        let val = this.value;    
        let reg = /^\d{1,12}$/;     
        if (reg.test(val)) {
            password_lock = true;
            this.style.borderColor = "green";
        } else {
            password_lock = false;
            this.style.borderColor = "red"
        }
        // console.log(password_lock)
    }


    // // 记住密码 
    // remenberInp.onchange = function () {
   
    //     let isRemenber = this.checked;
     
    //     let obj = {
    //         username: username.value,
    //         password: password.value,
    //         isRemenber
    //     }
    //     // 判定
    //     if (isRemenber) {
    //         localStorage.setItem("userinfo", JSON.stringify(obj))
    //     } else {
    //         localStorage.removeItem("userinfo");
    //     }
    //     console.log(isRemenber)
    // }

    // 登录按钮
    loginBtn.onclick = function() {
        usernameInp.onblur();
        passwordInp.onblur();
        // console.log(username_lock, password_lock) 
        if (!(username_lock && password_lock)) {
            return;
        }

        $.ajax({
                url: './php/login.php',
                data:{
                    username: usernameInp.value, 
                    password: passwordInp.value
                },
               
                type: "post",
                dataType: "json",
                success(data) {
                    // 请求成功时 
                    console.log(data);
                    location.href = "./html/list1.html"
                },
                error(data) {
                    // 请求失败时
                    console.log(data)
                }
              
            })
        // QF.post("./php/login.php", {username: usernameInp.value, password: passwordInp.value}, function(data) {
        //     console.log(data);
        //     if (!data.error) {
        //         location.href = "./html/list1.html";
        //     } else {
        //         alert(data.data)
        //     }
        // })

    }
})();

