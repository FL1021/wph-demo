// 导航栏hover效果
var dt = document.querySelector(".dt");
var dtul = document.querySelector("nav .nav .dropdown ul");
var drp= document.querySelector("nav .nav .dropdown ");
dt.onmousemove = function(){
    dtul.style.display = 'block';
}
drp.onmouseleave = function(){
    dtul.style.display = 'none';
}
// 渲染
;(function(){
    var uls = document.querySelectorAll(".list-group");
  
    var pagination = document.querySelector(".pagination")
    //一个变量用于规定一页展示的数据条数
    var dataCount = 16;
    //一个变量用于保存当前是第几页
    var currentPage = 11;
    var allData = [];
    var num = 0;
    var li = document.getElementsByTagName("li");
    QF.get('../php/goodsInfo.php',{},function({error,data}){
    // console.log({error,data});
//   默认一行16条数据
    if(!error){
        allData = data;
        var arr = data.slice(currentPage*dataCount,currentPage*dataCount + dataCount)
        renderData(arr);
       num = Math.ceil(data.length/16);
       renderPagination(currentPage);
       
    }
    });
    //渲染数据
    function renderData(arr){
      for (var i = 0; i < uls.length; i++) {
        uls[i].innerHTML = "";
    }
        for(var i = 0; i< arr.length ;i++){
            var item = arr[i];
            // console.log(item);
            let str = `
            <li class="list-group-item text-center">
              <div class="product-item">
            
                  <img class="img-responsive" alt="Responsive image"
                    src="${item.goods_small_logo}" alt="">
                </p>
                <p class='intro'>${item.goods_name}
                </p>
                <p class='list_price'>¥${item.goods_price}<a  class="btn btn-default addToCart"   data-id="${item.goods_id}" role="button"></a>
                </p>
              </div>
            </li>
  
         `
        //   console.log(str);
          uls[i % 4 ].innerHTML += str;
        }
    }
   // 添加按钮事件
    pagination.onclick = (e)=>{
        // console.log(e.target);
        if(e.target.className === 'leftBtn'){
            console.log('左');
            currentPage--;
            if(currentPage<0){
                currentPage = 0;
                return;
            }
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            renderData(arr)
            renderPagination(currentPage);
        }
        else if(e.target.className === 'rightBtn'){
            console.log('右');
            currentPage++;
            if (currentPage > num) {
                currentPage = num;
                return;
            }
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            renderData(arr)
            renderPagination(currentPage);
        }
        else if(e.target.className === 'num'){
            console.log('数字');
           
            if (currentPage === e.target.innerHTML - 1) {
              return;
          }
          currentPage = e.target.innerHTML - 1;
          var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
          renderData(arr);
          renderPagination(currentPage);
        }
    }

    function renderPagination(currentPage) {
      var str = `<li>
              <a aria-label="Previous">
                  <span class='leftBtn' aria-hidden="true">&laquo;</span>
              </a>
          </li>`
      // 判断当前页 
      if (currentPage <= 6) {
          for (var i = 0; i < 10; i++) {
              str += `<li><a class='num'>${i + 1}</a></li>`;
            //   var aa = document.querySelectorAll(".num");
            //    aa.style.backgroudColor = 'blue';
          }
      } else {
        var end1 = currentPage + 4 > num? num : currentPage + 4 ;
          
          for (var i = currentPage - 6; i < end1; i++) {
              str += `<li><a class='num'>${i + 1}</a></li>`;
          }
      }

      str += ` <li>
          <a  aria-label="Next">
              <span class='rightBtn' aria-hidden="true">&raquo;</span>
          </a>
      </li>`
      pagination.innerHTML = str;
  }
   
    

})();