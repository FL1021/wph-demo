var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项，相当于在最后一张加上一张猫腻图

    // 自动轮播时间
    autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,//不禁止用户操作后，可以自由轮播
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 小手
    // grabCursor : true,
    //滚轮控制移动
    mousewheel: true,
}) 
//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function(){
mySwiper.autoplay.stop();
// 隐藏显示左右按钮
mySwiper.navigation.$nextEl.removeClass('hide');
mySwiper.navigation.$prevEl.removeClass('hide');
}

//鼠标离开开始自动切换
mySwiper.el.onmouseout = function(){
mySwiper.autoplay.start();
// 
mySwiper.navigation.$nextEl.addClass('hide');
mySwiper.navigation.$prevEl.addClass('hide');
}  