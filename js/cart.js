// ==============================
// CART.JS
// ==============================


window.cart = JSON.parse(
localStorage.getItem("cart")
) || [];




// ==============================
// ADD CART
// ==============================


window.addCart=function(name,price){



let item = window.cart.find(function(x){

return x.name === name;

});




let numberPrice =

parseFloat(

price

.replace("RM","")

.trim()

);





if(item){


item.qty += 1;


}
else{


window.cart.push({


name:name,

price:numberPrice,

qty:1


});


}




saveCart();


updateCartCount();



showToast("Hameed's Bistro: " + name + " Added");



};








// ==============================
// SAVE CART
// ==============================


function saveCart(){


localStorage.setItem(

"cart",

JSON.stringify(window.cart)

);


}








// ==============================
// SHOW CART
// ==============================


window.showCart=function(){



showPage("cartPage");



displayCart();



};








// ==============================
// DISPLAY CART
// ==============================


window.displayCart=function(){



let box =

document.getElementById(

"cartItems"

);



if(!box)return;




box.innerHTML="";



let subtotal = 0;




window.cart.forEach(function(item,index){



let itemTotal =

item.price * item.qty;



subtotal += itemTotal;





box.innerHTML += `


<div class="item">


<div>

<b>${item.name}</b>

<br>

RM ${item.price.toFixed(2)}

x ${item.qty}


<br>

RM ${itemTotal.toFixed(2)}

</div>



<div>


<button onclick="changeQty(${index},1)">

+

</button>



<button onclick="changeQty(${index},-1)">

-

</button>



<button onclick="removeCart(${index})">

❌

</button>



</div>



</div>



`;



});






let sst = subtotal * 0.06;



let total = subtotal + sst;






let totalBox =

document.getElementById(

"total"

);





if(totalBox){



totalBox.innerHTML = `


Subtotal : RM ${subtotal.toFixed(2)}

<br>


SST 6% : RM ${sst.toFixed(2)}

<hr>


Total : RM ${total.toFixed(2)}


`;



}




};









// ==============================
// CHANGE QUANTITY
// ==============================


window.changeQty=function(index,value){



window.cart[index].qty += value;




if(window.cart[index].qty <=0){


window.cart.splice(index,1);


}




saveCart();


displayCart();


updateCartCount();



};








// ==============================
// REMOVE ITEM
// ==============================


window.removeCart=function(index){



window.cart.splice(index,1);



saveCart();



displayCart();



updateCartCount();



};








// ==============================
// UPDATE CART COUNT
// ==============================


window.updateCartCount=function(){



let count=0;



window.cart.forEach(function(item){



count += item.qty;



});




let c1 =

document.getElementById(
"cartCount"
);



let c2 =

document.getElementById(
"cartCount2"
);





if(c1){

c1.innerHTML=count;

}



if(c2){

c2.innerHTML=count;

}



};








// ==============================
// LOAD CART AFTER OPEN
// ==============================


window.addEventListener(

"load",

function(){


updateCartCount();


}

);
// ==============================
// RESTAURANT TOAST MESSAGE
// ==============================

window.showToast=function(message){


let toast=document.getElementById("toast");


if(!toast){


toast=document.createElement("div");

toast.id="toast";

document.body.appendChild(toast);


}



toast.innerHTML=message;


toast.classList.add("show");



setTimeout(function(){

toast.classList.remove("show");

},1000);



};
