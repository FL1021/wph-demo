<?php
    // 获取前端传递过来的信息
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 连接数据库
    mysql_connect('localhost', "root", "root");
    // 选择数据库
    mysql_select_db("wph");
    // 定义sql语句
    $sql = "SELECT * FROM user WHERE username='$username' and password='$password'";
    // 执行
    $result = mysql_query($sql);
    // 判定返回结果
    $row = mysql_fetch_array($result);
    // 返回数据
    if ($row) {
        // 后端给前端设置一个登录标记 
        setcookie("isLogin","1", time() + 1000000, "/");
        echo json_encode(array("error" => 0, "data" => "登录成功"));
    } else {
        echo json_encode(array("error" => 1, "data" => "用户名或密码错误"));
    }
?>