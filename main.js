let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//////////////////////////////
let mode = "Create";
let tmp;
//////////////////////////////
// console.log(title,price,taxes,ads,discount,total,count,category,submit)

// get total
    function getTotal(){
        // console.log('done')
        if(price.value != ''){
            let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value;
            total.innerHTML = result;
            total.style.background = 'rgb(0, 255, 0)'
        }else{
            total.innerHTML = '';
            total.style.background = ' rgb(124, 0, 0)';
        }
    }
// create product
    let productData;
    if(localStorage.product != null){
        productData = JSON.parse(localStorage.product)
    }else{
        productData = [];
    }
    submit.onclick = function(){
        let newProduct = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }
    // count & clean data
    if(title.value != '' 
    && price.value != ''
    && category.value != ''
    && newProduct.count <= 100
    ){
    if(mode === "Create")
    {
        if(newProduct.count > 1){
            for(let i = 0 ; i < newProduct.count ; i++)
            {
                productData.push(newProduct);
            }
        }else{
            productData.push(newProduct);
        }
    }else{
        productData[tmp] = newProduct;
        mode = "Create";
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    clearData();
    }
        // console.log(productData);
        // save local storage
        ////////////////////////////////////////////////////////////////
        localStorage.setItem('product', JSON.stringify(productData))
        ////////////////////////////////////////////////////////////////
        
        showData();
    }

// clear inputs
    function clearData(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        ads.value = '';
        category.value = '';
    }
// read
    function showData(){
        getTotal();
        let table = '';
        for(let i = 0 ; i < productData.length ; i++ )
        {
            table +=
            `
        <tr>
            <td>${i+1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
            `;
            // console.log(table);
        }
        document.getElementById('tbody').innerHTML = table;
        let deleteAllBtn = document.getElementById('deleteAll');
        if(productData.length > 0){
            deleteAllBtn.innerHTML = 
            `<button onclick="deleteAll()">Delete All( ${productData.length} )</button>`
        }else{
            deleteAllBtn.innerHTML = '';
        }
    }
    showData();
// delete
    function deleteData(i){
        productData.splice(i,1);
        localStorage.product = JSON.stringify(productData);
        showData();
    }
    function deleteAll()
    {
        localStorage.clear();
        productData.splice(0);
        showData();
    }
// update
    function updateData(i){
        title.value = productData[i].title;
        price.value = productData[i].price;
        taxes.value = productData[i].taxes;
        ads.value = productData[i].ads;
        discount.value = productData[i].discount;
        getTotal();
        count.style.display = "none";
        category.value = productData[i].category;
        submit.innerHTML = 'Update';
        mode = "Update";
        tmp = i;
        scroll({top:0 , behavior:'smooth'})
    }
// search
    let searchMode = 'title';
    function getSearchMode(id)
    {
        //console.log(id);
        let search = document.getElementById('search');
        if(id == "searchTitle")
        {
            searchMode = 'title';
        }
        else{
            searchMode = 'category';
        }
        search.placeholder = 'Search By '+ searchMode;
        search.focus();
        search.value = '';
        showData();
    }
    function searchData(value)
    {
        let table = '';
        //console.log(value);
        for(let i = 0 ; i < productData.length ; i++)
        {
        if(searchMode == 'title')
        {
                if (productData[i].title.includes(value.toLowerCase())) {
                        table += `
                        <tr>
                        <td>${i}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                        `;
                }
            }
        
        else{
                if (productData[i].category.includes(value.toLowerCase())) {
                        table += `
                        <tr>
                        <td>${i}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                        `;
                }
            }
            }
    document.getElementById('tbody').innerHTML = table;
    }
// 
