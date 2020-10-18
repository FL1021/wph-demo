;(function() {
 
    var tbody = document.querySelector("tbody");  
    var thead = document.querySelector("thead");  
    var panelBody = document.querySelector('.panel-body')
    function count(){
        
        var shoppingCart = JSON.parse(localStorage.getItem('shoppingCartInfo'));
        var sum = shoppingCart.filter(function(value){
            //算总价要用到isSelected
            return value.isSelected;

        })
        .reduce(function(prev,value){
            return prev + value.goods_price * value.number;
        },0)
        // console.log(sum);
        panelBody.innerHTML = sum;
    
    }
    // 本地存储
    function render(){
        var arr = JSON.parse(localStorage.getItem('shoppingCartInfo')) || [];
        var isAllChecked = arr.every(function(value){
            return value.isSelected;
        })
        var str = '';
        
    arr.forEach(function(value) {
        thead.innerHTML=` <tr>
        <th class=" text-center"> <input type="checkbox" ${isAllChecked?'checked':''}>全选 </th>
        <th class=" text-center">商品名称</th>
        <th class=" text-center">商品信息</th>
        <th class=" text-center">商品单价</th>
        <th class=" text-center">商品价格</th>
        <th class=" text-center">商品数量</th>
        <th class=" text-center">操作</th>
    </tr>`
      str += 
        `<tr>
            <td><input ${value.isSelected?'checked':''} data-id='${value.goods_id}'type="checkbox"></td>
            <td>${value.cat_three_id}</td>
            <td>${value.goods_name}</td>
            <td>${value.goods_price}</td>       
            <td>${(value.goods_price*value.number).toFixed(2)}</td>
            <td>${value.number}</td>
            <td><button class="button"data-id='${value.goods_id}'>+</button>
            <button class="button"data-id='${value.goods_id}'>-</button></td>
        </tr>
    `
    })
    tbody.innerHTML = str;
    }
    render();
    count();

    //事件委托，把事件绑定
    thead.onclick = function(e){
        if(e.target.tagName === 'INPUT'){
            // console.log(11);
            var isAllChecked = e.target.checked;
        var shoppingCart = JSON.parse(localStorage.getItem('shoppingCartInfo'))
            shoppingCart.forEach(function(value){
                 value.isSelected = isAllChecked
            })
            localStorage.setItem('shoppingCartInfo',JSON.stringify(shoppingCart))
            count();
            render();
        }
    }
    tbody.onclick = function(e){
        var shoppingCart = JSON.parse(localStorage.getItem('shoppingCartInfo'))
        if(e.target.tagName === 'INPUT'){
            // console.log(22);
            var id = e.target.getAttribute('data-id');
            console.log(id);
            var product = shoppingCart.find((value) => {
                return value.goods_id === id;
            })

            product.isSelected = e.target.checked;
            localStorage.setItem('shoppingCartInfo',JSON.stringify(shoppingCart))
            count();
            render();

        }else if(e.target.innerHTML === '+'){
            console.log('jia');
            var id = e.target.getAttribute('data-id');
            //商品数量加1
            var product = shoppingCart.find((value) => {
                return value.goods_id === id;
            })
            console.log(product);
            product.number++;
            localStorage.setItem('shoppingCartInfo',JSON.stringify(shoppingCart))
            render();
            count()
        }
        else if(e.target.innerHTML === '-'){
            console.log('jian');
            var id = e.target.getAttribute('data-id');
            var product = shoppingCart.find((value) => {
                return value.goods_id === id;
            })
            console.log(product);
            product.number--;
            if(product.number === 0){
                var idx = shoppingCart.indexOf(product)
                shoppingCart.splice(idx,1)
            }
            // product.number = product.number<0? 0:product.number;
            localStorage.setItem('shoppingCartInfo',JSON.stringify(shoppingCart))
            render();
            count()

        }
    }
    
})();