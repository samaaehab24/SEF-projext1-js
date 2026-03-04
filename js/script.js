//local storage
//1-local storage استدعي ال
//localStorage.setItem("first Car" , "BMW")//key , value //set بخزن البيانات في ال local storage
//localStorage.setItem("SUD1", "samaa")
//console.log(localStorage.getItem("SUD1"))
//console.log(localStorage.getItem("first Car"))
//local storage لما اجي اسجل في اي موقع البيانات بتتخزن في ال
//local storage لما يجي يعمل اتشيك علي البيانات بيجبها من
//localStorage.removeItem("SUD1")//بتمسح item
//localStorage.setItem("SUD2", "sama")
//localStorage.setItem("SUD3", "sam")
//localStorage.clear()//remove local storageكلها
//////////////////////////////////////////////////////////////////////////
let userInfo = document.querySelector("#user_info")
let userData = document.querySelector("#user")
let links = document.querySelector("#links")

if(localStorage.getItem("username")){
    links.remove()
    userInfo.style.display = "flex";
    userData.innerHTML = localStorage.getItem("username")
}
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})
////////////////////////////////////////////////////////////////////////
let allProducts = document.querySelector(".products")
let products = [
    {
        id:1,
        title:"Large Monstera",
        price:35,
        imageUrl:"images/p13.jpg",
    },
    {
        id:2,
        title:"Brid Nest",
        price:45,
        imageUrl:"images/p14.jpg",
    },
    {
        id:3,
        title:"Fiddle Leaf",
        price:50,
        imageUrl:"images/p15.jpg",
    },
    {
        id:4,
        title:"Wings Begonia",
        price:35,
        imageUrl:"images/p16.jpg",
    },
    {
        id:5,
        title:"Faux Orchid",
        price:40,
        imageUrl:"images/p17.jpg",
    },
    {
        id:6,
        title:"Parlor Palm",
        price:30,
        imageUrl:"images/p19.jpg",
    },
    {
        id:7,
        title:"Potted Plant",
        price:60,
        imageUrl:"images/p21.jpg",
    },
    {
        id:8,
        title:"Red Margin",
        price:50,
        imageUrl:"images/p22.jpg",
    },
    {
        id:9,
        title:"Aloe Vera",
        price:55,
        imageUrl:"images/p23.jpg",
    },
]
// function drawItems(items){
//     let y = items.map((item)=>{
//         return `
//         <div class="product-item shadow rounded-4">
//                     <img src="${item.imageUrl}" alt="plant" class="product-img">
//                     <div class="product-desc d-flex justify-content-between">
//                         <h5>${item.title}</h5>
//                         <span class="product-price">$${item.price}</span>
//                     </div><!--/desc-->
//                     <div class="product-action">
//                         <i class="fa-solid fa-cart-plus add-to-card" onClick="addToCard(${item.id})"></i>
                        
//                         <i class="far fa-heart heart-icon" ></i>
//                     </div><!--/product-action-->
//                 </div><!--/product-item-->
//                 `
//     })
//     allProducts.innerHTML = y.join("");
// }
// drawItems(products)
// جلب قائمة favorites من localStorage أو إنشاء مصفوفة فارغة
let favorites = localStorage.getItem("favorites") 
    ? JSON.parse(localStorage.getItem("favorites")) 
    : [];

// تحديث drawItems لتضيف data-id لكل قلب
function drawItems(items){
    let y = items.map(item => {
        return `
        <div class="product-item shadow rounded-4">
            <img src="${item.imageUrl}" alt="plant" class="product-img">
            <div class="product-desc d-flex justify-content-between">
                <h5>${item.title}</h5>
                <span class="product-price">$${item.price}</span>
            </div>
            <div class="product-action">
                <i class="fa-solid fa-cart-plus add-to-card" onClick="addToCard(${item.id})"></i>
                <i class="fa-solid fa-heart heart-icon" data-id="${item.id}"></i>
            </div>
        </div>`;
    });
    allProducts.innerHTML = y.join("");

    // بعد الرسم، نضيف Event Listener للقلوب
    document.querySelectorAll(".heart-icon").forEach(heart => {
        let id = parseInt(heart.dataset.id);
        // إذا موجود مسبقًا في favorites، نخلي القلب أحمر
        if(favorites.some(fav => fav.id === id)) {
            heart.classList.add("text-danger");
        }
        heart.addEventListener("click", function(){
            let product = products.find(p => p.id === id);

            if(!favorites.some(fav => fav.id === product.id)) {
                favorites.push(product);
                heart.classList.add("text-danger");
            } else {
                favorites = favorites.filter(fav => fav.id !== product.id);
                heart.classList.remove("text-danger");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}
drawItems(products)

let searchInput = document.querySelector("#searchInput")

searchInput.addEventListener("keyup", function(){

    let searchValue = searchInput.value.toLowerCase()

    let filtered = products.filter(function(item){

        return item.title.toLowerCase().includes(searchValue)

    })

    drawItems(filtered)

})
let badge = document.querySelector(".badge")
let cardproductsDiv = document.querySelector(".card-products div")

// let addedItem = [];
let addedItem = localStorage.getItem("ProductsInCard") ? JSON.parse(localStorage.getItem("ProductsInCard")) : [];
if(addedItem) {
    addedItem.map(item => {
        cardproductsDiv.innerHTML += `<p>${item.title}</p>`;
    })
    badge.style.display = "block";
    badge.innerHTML = addedItem.length;
}




    if(localStorage.getItem("username")){
        function addToCard(id){
    let choosenItem = products.find((item) => item.id === id);
    cardproductsDiv.innerHTML += `<p>${choosenItem.title}</p>`;

    addedItem = [...addedItem, choosenItem]
    localStorage.setItem("ProductsInCard", JSON.stringify(addedItem))
    let cardProductsLength = document.querySelectorAll(".card-products div p")
    // console.log(cardProductsLength.length)
    badge.style.display = "block";
    badge.innerHTML = cardProductsLength.length;
}
    }else{
        window.location = "login.html"
    }

//////////////////////////////////////////////////
let shoppingCardIcon = document.querySelector(".shopping-card")
let cardsProducts = document.querySelector(".card-products")
shoppingCardIcon.addEventListener("click", openCard)
function openCard(){
    if(cardproductsDiv.innerHTML != ""){
        if(cardsProducts.style.display == "block"){
            cardsProducts.style.display="none"
        }else{
            cardsProducts.style.display="block" 
        }
    }
}
///////////////////////////////////////////////////////

let priceRange = document.querySelector("#priceRange")
let priceValue = document.querySelector("#priceValue")
priceRange.addEventListener("input", function(){
    priceValue.innerText = `$0 - $${priceRange.value}`
    
    let maxPrice = parseFloat(priceRange.value)
    let filtered = products.filter(item => item.price <= maxPrice)
    drawItems(filtered)
})
let maxProductPrice = Math.max(...products.map(p => p.price))
priceRange.max = maxProductPrice
priceRange.value = maxProductPrice
priceValue.innerText = `$0 - $${maxProductPrice}`


