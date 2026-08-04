// =====================================
// RESTORAN HAMEED'S BISTRO
// CART.JS V2
// PART 1
// =====================================



function getCart(){


return JSON.parse(

localStorage.getItem("cart")

) || [];


}




function saveCart(cart){


localStorage.setItem(

"cart",

JSON.stringify(cart)

);


}




// =====================================
// ADD TO CART
// =====================================

window.addToCart=function(item){



let cart =
getCart();



const exist =
cart.find(

x=>x.id === item.id

);



if(exist){


exist.qty += 1;


}

else{


cart.push({

id:item.id,

name:item.name,

price:Number(item.price),

image:item.image || "",

qty:1

});


}



saveCart(cart);



showToast(
"Added to Cart"
);



};





// =====================================
// DISPLAY CART
// =====================================

window.displayCart=function(){


const box =
document.getElementById(
"cartItems"
);



if(!box)return;



const cart =
getCart();



box.innerHTML="";



if(cart.length===0){


box.innerHTML =
"<h3>Cart Empty</h3>";


return;


}



let total=0;



cart.forEach((item)=>{


total +=
item.price * item.qty;



const div =
document.createElement("div");



div.className =
"cartItem";



div.innerHTML = `

<h3>${item.name}</h3>

<p>
RM ${item.price.toFixed(2)}
x
${item.qty}
</p>

<button onclick="increaseQty('${item.id}')">
+
</button>


<button onclick="decreaseQty('${item.id}')">
-
</button>


<button onclick="removeCartItem('${item.id}')">
Remove
</button>

`;



box.appendChild(div);



});



const totalBox =
document.getElementById(
"cartTotal"
);



if(totalBox){

totalBox.innerHTML =
"Total: RM "
+
total.toFixed(2);


}



};
// =====================================
// INCREASE QUANTITY
// =====================================

window.increaseQty=function(id){


let cart =
getCart();



const item =
cart.find(

x=>x.id === id

);



if(item){


item.qty += 1;


}



saveCart(cart);



displayCart();



};





// =====================================
// DECREASE QUANTITY
// =====================================

window.decreaseQty=function(id){


let cart =
getCart();



const item =
cart.find(

x=>x.id === id

);



if(item){


item.qty -= 1;



if(item.qty <= 0){


cart =
cart.filter(

x=>x.id !== id

);


}



}



saveCart(cart);



displayCart();



};





// =====================================
// REMOVE ITEM
// =====================================

window.removeCartItem=function(id){


let cart =
getCart();



cart =
cart.filter(

x=>x.id !== id

);



saveCart(cart);



displayCart();



showToast(
"Item Removed"
);



};





// =====================================
// CLEAR CART
// =====================================

window.clearCart=function(){


localStorage.removeItem(
"cart"
);



displayCart();



showToast(
"Cart Cleared"
);



};
