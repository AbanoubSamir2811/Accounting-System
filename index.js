let price = document.getElementById("price");
let texas = document.getElementById("texas");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let title = document.getElementById("title");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let tmp;

function setTotal(){
    if (price.value != ""){
        let result = (+price.value + +texas.value + +ads.value) - +discount.value;
        total.innerHTML = " " + result;
        total.style.backgroundColor = "green";
    }else{
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(223, 37, 37)";
    }
}


//crearte product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        texas: texas.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }


    if (mood == 'create'){
        if (newpro.count > 1){
        for (let i = 0; i < newpro.count; i++){
            dataPro.push(newpro);
        }
        }else{
            dataPro.push(newpro);
        }
    }else{
        dataPro[tmp] = newpro;
        mood = 'create';
        submit.innerHTML = "create";
        count.style.display= "block";
    }
    
    
    localStorage.setItem("product", JSON.stringify(dataPro));
    clearData()
    showData()
}


// clear data

function clearData(){
    title.value = "",
    price.value = "",
    texas.value = "",
    ads.value = "",
    discount.value="",
    total.innerHTML = "",
    count.value = "",
    category.value = ""
}



// read

function showData(){
    let table = "";
    for (i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].texas}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete= document.getElementById("deleteAll");
    if (dataPro.length > 0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML="";
    }
    setTotal()
}
showData()

//delete 

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro);
    showData();
}


//deleteAll

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// count

//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    texas.value = dataPro[i].texas;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    setTotal();
    count.style.display= "none";
    category.value = dataPro[i].category;
    submit.innerHTML="Update";
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}



// search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById("search");
    if (id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';

    }
    search.focus();
    search.value ="";
    showData();
}


function searchData(value){
    let table ="";
    if (searchMood == 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].texas}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value)){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].texas}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData ( ${i} )" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}