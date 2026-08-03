// =====================================
// RESTORAN HAMEED'S BISTRO
// CART.JS FINAL
// =====================================



// ================================
// GET CART
// ================================

function getCart(){


let cart = JSON.parse(
localStorage.getItem("cart")
)
|| [];


return cart;


}






// ================================
// UPDATE CART COUNT
// ================================


window.updateCartCount=function(){



let cart=getCart();



let count=cart.length;



let ids=[

"cartCount",

"cartCount2",

"cartCount3"

];




ids.forEach(function(id){



let el=document.getElementById(id);



if(el){


el.innerHTML=count;


}



});



};









// ================================
// DISPLAY CART
// ================================


window.displayCart=function(){



let cart=getCart();



let box=document.getElementById(
"cartItems"
);



if(!box) return;



box.innerHTML="";





if(cart.length===0){



box.innerHTML=`

<h3 style="text-align:center">

🛒 Cart Empty

</h3>

`;



updateCartCount();



updateTotal();



return;


}







cart.forEach(function(item,index){



let div=document.createElement("div");



div.className="cart-item";




div.innerHTML=`

<div>

<b>${item.name}</b>

<br>

RM ${Number(item.price).toFixed(2)}

</div>



<button onclick="removeCartItem(${index})">

❌

</button>

`;




box.appendChild(div);



});





updateCartCount();



updateTotal();



};









// ================================
// REMOVE ITEM
// ================================


window.removeCartItem=function(index){



let cart=getCart();



cart.splice(index,1);



localStorage.setItem(

"cart",

JSON.stringify(cart)

);




displayCart();



showToast(

"Item Removed"

);



};









// ================================
// TOTAL WITH SST
// ================================


window.updateTotal=function(){



let cart=getCart();



let subtotal=0;



cart.forEach(function(item){



subtotal += Number(item.price) || 0;



});





let sst = subtotal * 0.06;



let total = subtotal + sst;






let totalBox=document.getElementById(
"total"
);



if(totalBox){



totalBox.innerHTML=

`

Subtotal : RM ${subtotal.toFixed(2)}

<br>

6% SST : RM ${sst.toFixed(2)}

<hr>

Total : RM ${total.toFixed(2)}

`;



}



};









// ================================
// ADD ITEM
// ================================


window.addToCart=function(name,price){



let cart=getCart();




cart.push({


name:name,


price:Number(price)


});





localStorage.setItem(

"cart",

JSON.stringify(cart)

);






updateCartCount();





showToast(

"Hameed's Bistro says " 
+
name
+
" Added"

);





};









// ================================
// PAGE LOAD
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){



updateCartCount();



}

);
