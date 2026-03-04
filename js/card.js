let ProductsInCard = localStorage.getItem("ProductsInCard")
let allProducts = document.querySelector(".products")
if(ProductsInCard){
    let item = JSON.parse(ProductsInCard);
    drawCardProducts(item)
}
function drawCardProducts(items){
    let y = items.map((item)=>{
        return `
        <div class="product-item shadow rounded-4">
                    <img src="${item.imageUrl}" alt="plant" class="product-img">
                    <div class="product-desc d-flex justify-content-between">
                        <h5>${item.title}</h5>
                        <span class="product-price">$${item.price}</span>
                    </div><!--/desc-->
                    <div class="product-action">
                        <i class="fa-solid fa-circle-xmark add-to-card" onClick="removeFromCard(${item.id})"></i>
                    </div><!--/product-action-->
                </div><!--/product-item-->
                `
    })
    allProducts.innerHTML = y.join("");

}
function removeFromCard(id){
    let ProductsInCard = JSON.parse(localStorage.getItem("ProductsInCard")) || [];

    let index = ProductsInCard.findIndex(item => item.id === id);

    if(index !== -1){
        ProductsInCard.splice(index, 1);
    }

    localStorage.setItem("ProductsInCard", JSON.stringify(ProductsInCard));

    drawCardProducts(ProductsInCard);
    updateTotalPrice(); 

    let badge = document.querySelector(".badge");
    if(ProductsInCard.length > 0){
        badge.style.display = "block";
        badge.innerHTML = ProductsInCard.length;
    }else{
        badge.style.display = "none";
    }
}
function updateTotalPrice() {
    let cart = localStorage.getItem("ProductsInCard") 
        ? JSON.parse(localStorage.getItem("ProductsInCard")) 
        : [];

    let total = cart.reduce((acc, item) => acc + item.price, 0);
    let totalPriceEl = document.querySelector("#totalPrice");
    if(totalPriceEl) {
        totalPriceEl.innerText = total.toFixed(2);
    }
}


document.addEventListener("DOMContentLoaded", function(){
    updateTotalPrice();
});

let favoritesList = document.querySelector("#favoritesList");
let favorites = localStorage.getItem("favorites") 
    ? JSON.parse(localStorage.getItem("favorites")) 
    : [];

function renderFavorites() {
    favoritesList.innerHTML = favorites.map(item => {
        return `
        <div class="product-item shadow rounded-4">
            <img src="${item.imageUrl}" alt="${item.title}" class="product-img">
            <div class="product-desc d-flex justify-content-between">
                <h5>${item.title}</h5>
                <span class="product-price">$${item.price}</span>
            </div>
            <div class="product-action">
                <i class="fa-solid fa-circle-xmark add-to-card" data-id="${item.id}" style="cursor:pointer;color:#ff4d4f;"></i>
            </div>
        </div>
        `;
    }).join("");

    document.querySelectorAll(".add-to-card").forEach(icon => {
        icon.addEventListener("click", function(){
            let id = parseInt(icon.dataset.id);
            favorites = favorites.filter(fav => fav.id !== id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            renderFavorites();
        });
    });
}

renderFavorites();