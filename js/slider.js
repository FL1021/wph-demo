 //1. 获取元素
 var sliderbar = document.querySelector('.fixedtool');
 
 var banner = document.querySelector('.bg');
 // banner.offestTop 就是被卷去头部的大小(172) 一定要写到滚动的外面
 var bannerTop = banner.offsetTop
     // 当我们侧边栏固定定位之后应该变化的数值(防止固定定位后的sliderbar往下跳，因为刚开始给了个绝对定位的top值)
 var sliderbarTop = sliderbar.offsetTop - bannerTop;


 // 2. 页面滚动事件 scroll
 document.addEventListener('scroll', function() {
     // console.log(11);
     // window.pageYOffset 页面被卷去的头部
     // console.log(window.pageYOffset);
     // 3 .当我们页面被卷去的头部大于等于了 172 此时 侧边栏就要改为固定定位
     if (window.pageYOffset >= bannerTop) {
         sliderbar.style.position = 'fixed';
         sliderbar.style.top = sliderbarTop +'-150'+ 'px';
     } else {
         sliderbar.style.position = 'absolute';
         sliderbar.style.top = '180px';
         // 拉回去的时候给回固定定位的px
     }
   
    
   

 })