; (function () {
   
    var dataCount = 16;
    var currentPage = 10;
    var uls = document.querySelectorAll(".list-group");
    var pagination = document.querySelector(".pagination");
    var allData = [];
    var num = 0;
    QF.get("../php/goodsInfo.php", {}, function ({ error, data }) {


        if (!error) {
            allData = data;
            var arr = data.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            renderData(arr);

            num = Math.ceil(data.length / 16);
            renderPagination(currentPage);
        }
    });


    pagination.onclick = function (e) {
        if (e.target.className === "leftBtn") {
            currentPage--;
            if (currentPage < 0) {
                currentPage = 0;
                return;
            }
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            renderData(arr)
            renderPagination(currentPage);
        } else if (e.target.className === "rightBtn") {
            currentPage++;
            if (currentPage > num) {
                currentPage = num;
                return;
            }
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            renderData(arr)
            renderPagination(currentPage);
        } else if (e.target.className === "num") {
            if (currentPage === e.target.innerHTML - 1) {
                return;
            }
            currentPage = e.target.innerHTML - 1;
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            renderData(arr);
            renderPagination(currentPage);
        }
    }



    function renderData(arr) {
        for (var i = 0; i < uls.length; i++) {
            uls[i].innerHTML = "";
        }
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            console.log(item)
            let str = `<li class="list-group-item">
                <div class="product-item text-center">
                    <p class="h4">${item.cat_three_id}</p>
                    <p>
                        <img  alt="Responsive image" src="${item.goods_small_logo}">
                    </p>
                    <p class="intro">
                        ${item.goods_name}<a class="btn btn-default"  role="button">加入购物车</a>
                    </p>
                    <p>
                        ￥${item.goods_price}
                    </p>
                </div>
            </li>`;
            uls[i % 4].innerHTML += str;
        }
    }


    function renderPagination(currentPage) {
        var str = `<li>
                <a aria-label="Previous">
                    <span class='leftBtn' aria-hidden="true">&laquo;</span>
                </a>
            </li>`
        if (currentPage <= 6) {
            for (var i = 0; i < 10; i++) {
                str += `<li><a class='num'>${i + 1}</a></li>`;
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