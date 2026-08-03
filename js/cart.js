// ==============================
// CART.JS
// ==============================

window.cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add To Cart
window.addCart = function(name,price){

let item = cart.find(x=>x.name==name);

if(item){

item.qty++;

}else{

cart.push({

name:name,

price:price,

qty:1

});

}

saveCart();

updateCartCount();

alert("Added To Cart");

};


// Save Cart
function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}


// Update Cart Count
window.updateCartCount = function(){

let total=0;

cart.forEach(item=>{

total += item.qty;

});

let c1=document.getElementById("cartCount");

let c2=document.getElementById("cartCount2");

if(c1) c1.innerHTML=total;

if(c2) c2.innerHTML=total;

};


// Show Cart
window.showCart = function(){

pageHistory.push("cartPage");

showPage("cartPage");

let box=document.getElementById("cartItems");

box.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

let amount=parseFloat(item.price.replace("RM",""))*item.qty;

total+=amount;

box.innerHTML+=`

<div class="cart-item">

<b>${item.name}</b>

<br>

${item.price}

<br><br>

<button onclick="changeQty(${index},-1)">-</button>

<b>${item.qty}</b>

<button onclick="changeQty(${index},1)">+</button>

</div>

`;

});

document.getElementById("total").innerHTML=

"Total : RM "+total.toFixed(2);

};


// Change Qty
window.changeQty=function(index,value){

cart[index].qty += value;

if(cart[index].qty<=0){

cart.splice(index,1);

}

saveCart();

updateCartCount();

showCart();

};


// Clear Cart
window.clearCart=function(){

cart=[];

saveCart();

updateCartCount();

showCart();

};


// প্রথমেই Cart Count Update
updateCartCount();
