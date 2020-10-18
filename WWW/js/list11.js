var dt = document.querySelector(".dt");
var dtul = document.querySelector("nav .nav .dropdown ul");
var drp= document.querySelector("nav .nav .dropdown ");
// 导航栏hover效果
dt.onmousemove = function(){
    dtul.style.display = 'block';
}
drp.onmouseleave = function(){
    dtul.style.display = 'none';
}

; (function () {
    var $ul = $(".main_box");
    // 获取li
    // var $lis = $("ul .info");
    // console.log($lis);
    sendAjax();
    // 封装函数复用发送ajax的代码
    function sendAjax() {
        // 发送ajax
        $.ajax({
            url: `/resource/3.json`,
            type: "get",
            dataType: "json",
            success: function (data) {
                // console.log(data);
                //循环所有数据
                data.result.wall.docs.forEach((value) => {
                    setTimeout(() => {
                        // console.log(value)
                    // console.log(value.price);

                       $ul.append(` 
                       <li class="info">
                       <div class="info-img">
                       <img src="${value.img}" alt="">
                   </div>
                    <div class="info-mes">
                        <h3>${value.title}</h3>
                        <p><span class="salebg2">${value.price}</span>元</p>
                    </div>  </li> `
                    )
                    
               
                    }, 300)
                })
            },
            error(data){
                console.log(data);
            }
        })

    }
  
    // // 定义一个timer
    // var timer = null;
    // // 页面滚动事件
    // $(document).on("scroll", function () {
    //     // 获取页面的卷动值 获取页面高度 获取视口高度 并计算
    //     var scrollTop = $(document).scrollTop()
    //     // 获取页面高度
    //     var pageHeight = $(document.body).height();
    //     // 获取视口高度
    //     var clientHeight = $(window).height();
    //     // 页面卷动值+视口高度 如果接近页面高度 说明快要到底部
    //     if (scrollTop + clientHeight > pageHeight - 100) {
    //         clearInterval(timer);
    //         timer = setTimeout(function() {
    //             console.log(111);
    //             sendAjax();
    //         }, 100)
    //     }
    // })


})();