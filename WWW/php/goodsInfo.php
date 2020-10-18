<?php

    // 连接数据库
    mysql_connect('localhost', "root", "root");
    // 选择数据库
    mysql_select_db("gz2006");
    // 定义sql语句
    $sql = "SELECT * FROM goods";
    // 执行
    $result = mysql_query($sql);
    // 把数据从结果集中抽取出来 放入数组 再返回给前端
    $arr = array();
    while($row = mysql_fetch_array($result)) {
        array_push($arr, $row);
    }

    echo json_encode(array("error" => 0, "data" => $arr));
   
?>