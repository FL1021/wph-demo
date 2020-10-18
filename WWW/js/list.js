;(function(){
    var uls = document.querySelectorAll(".list-group");
  
    var pagination = document.querySelector(".pagination")
    //一个变量用于规定一页展示的数据条数
    var dataCount = 16;
    //一个变量用于保存当前是第几页
    var currentPage = 13;
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
        
        // for(var i = currentPage*dataCount; i< currentPage*dataCount + dataCount ;i++){
        //     var item = data[i];
        //     // console.log(item);
        //     let str = `
        //     <li class="list-group-item text-center">
        //       <div class="product-item">
        //         <p class="h4">${item.cat_three_id}</p>
        //         <p>
        //           <img class="img-responsive" alt="Responsive image"
        //             src="${item.goods_small_logo}" alt="">
        //         </p>
        //         <p class='intro'>${item.goods_name}
        //         </p>
        //         <p>¥${item.goods_price}
        //         </p>
        //       </div>
        //     </li>
  
        //  `
        //   console.log(str);
        //   uls[i % 4 ].innerHTML += str;
        //}
       num = Math.ceil(data.length/16);
       renderPagination(currentPage);
       
    }
      //   var str = '';
      //   str+=`<li>
      //   <a  aria-label="Previous">
      //     <span  class='leftBtn' aria-hidden="true">&laquo;</span>
      //   </a>
      // </li>`;
      // if(num>9){
      //     for(var i = 0; i < 4; i++){
      //      str+=` <li><a class='num'>${i+1}</a></li>`;
      //     }
      //     str+=`<li><a>${'...'}</a></li>`
      //     for(var i = num - 4; i < num; i++){
      //       str+=` <li><a class='num'>${i+1}</a></li>`;
      //      }
    //   }
    //   str+=`<li>;
    //   <a  aria-label="Previous">
    //     <span class='rightBtn' aria-hidden="true">&raquo;</span>
    //   </a>
    // </li>`;
    // }
    // pagination.innerHTML = str;

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
                <p class="h4">${item.cat_three_id}</p>
                <p>
                  <img class="img-responsive" alt="Responsive image"
                    src="${item.goods_small_logo}" alt="">
                </p>
                <p class='intro'>${item.goods_name}
                </p>
                <p>¥${item.goods_price}<a  class="btn btn-default addToCart"   data-id="${item.goods_id}" role="button">加入购物车</a>
                </p>
              </div>
            </li>
  
         `
        //   console.log(str);
          uls[i % 4 ].innerHTML += str;
        }
    }
    //添加按钮事件
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
   //购物车点击
   let list = document.querySelector('.list');

   list.onclick = function(e){
    //    console.log(222);
       if(e.target.className.includes(' addToCart'))
       //此时点到了加入购物车按钮
       {
        //    console.log(111);
           var goods_id = e.target.getAttribute('data-id');
           //data-id 为自定义的类
        //    console.log(goods_id);
            // 拿着ID去本地存储里看一看有没有
            var arr = JSON.parse(localStorage.getItem('shoppingCartInfo')) || [];
           //返回与goods_id所在的对象
            var goods_item = arr.find(function(value) {
                return value.goods_id === goods_id;
            });
           
            // console.log(goods_item);
           
            if (goods_item) {
                // 如果为真 说明已经存在 
                goods_item.number++;
            } else {
                // 说明不存在
                // 拿着id去大数组里找 
                goods_item = allData.find(function(value) {
                    return value.goods_id === goods_id;
                });
                // 设置一个number属性为1 然后直接往本地存储数组里存储就好了
                goods_item.number = 1;
                arr.push(goods_item);
            }
            // 将修改之后的数据放回本地存储
            localStorage.setItem("shoppingCartInfo", JSON.stringify(arr));
       }
   }
    

})();