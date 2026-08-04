// =====================================
// CART SYSTEM V5
// Restoran Hameed's Bistro
// =====================================


let cart = [];




// Load cart from memory

if(localStorage.getItem("cart")){


cart = JSON.parse(

localStorage.getItem("cart")

);


}





// =====================================
// ADD ITEM TO CART
// =====================================


window.addToCart = function(id){



let item = menuData.find(

x => x.id === id

);



if(!item){

console.log("Item not found");

return;

}




let existing = cart.find(

x => x.id === id

);




if(existing){


existing.qty += 1;


}

else{


cart.push({

id:item.id,

name:item.name,

category:item.category,

price:getCartPrice(item),

qty:1


});


}




saveCart();



showToast(

item.name + " added"

);



};









// =====================================
// PRICE FOR CART
// =====================================


function getCartPrice(item){


let type =

localStorage.getItem("orderType")

|| "DINE IN";




if(type==="TAKE AWAY"){


return Number(

item.takeAwayPrice || 0

);


}



return Number(

item.dineInPrice || 0

);



}









// =====================================
// SAVE CART
// =====================================


function saveCart(){


localStorage.setItem(

"cart",

JSON.stringify(cart)

);



updateCartCount();


}








// =====================================
// CART COUNT
// =====================================


function updateCartCount(){



let total = cart.reduce(

(sum,item)=>

sum + item.qty,

0

);




let ids=[

"cartCount",

"cartCount2",

"cartCount3"

];




ids.forEach(id=>{


let el=

document.getElementById(id);



if(el){

el.innerHTML=total;


}



});


}



updateCartCount();
// =====================================
// SHOW CART PAGE
// =====================================


window.showCart = function(){



document.getElementById("welcome")
.style.display="none";



document.getElementById("menuPage")
.style.display="none";



document.getElementById("checkoutPage")
.style.display="none";



document.getElementById("cartPage")
.style.display="block";



displayCart();



};









// =====================================
// DISPLAY CART
// =====================================


function displayCart(){



let box =

document.getElementById("cartItems");



if(!box) return;




box.innerHTML="";




if(cart.length===0){


box.innerHTML=

`

<h3>

Your cart is empty

</h3>

`;



updateTotal();


return;


}






cart.forEach(item=>{


box.innerHTML +=

`

<div class="cart-item">



<div>


<h3>

${item.name}

</h3>


<p>

RM ${item.price.toFixed(2)}

</p>



</div>





<div>


<button

onclick="minusQty('${item.id}')">


➖


</button>



<span>

${item.qty}

</span>




<button

onclick="plusQty('${item.id}')">


➕


</button>



<br>


<button

onclick="removeItem('${item.id}')">


🗑 Remove


</button>



</div>



</div>


`;



});




updateTotal();



}









// =====================================
// PLUS
// =====================================


window.plusQty=function(id){



let item = cart.find(

x=>x.id===id

);



if(item){


item.qty++;

}



saveCart();


displayCart();



};









// =====================================
// MINUS
// =====================================


window.minusQty=function(id){



let item = cart.find(

x=>x.id===id

);



if(item && item.qty>1){


item.qty--;


}



saveCart();


displayCart();



};








// =====================================
// REMOVE ITEM
// =====================================


window.removeItem=function(id){



cart = cart.filter(

x=>x.id!==id

);



saveCart();


displayCart();



};









// =====================================
// TOTAL
// =====================================


function updateTotal(){



let total = cart.reduce(

(sum,item)=>

sum +

(item.price * item.qty),

0

);





let totalBox =

document.getElementById("total");



if(totalBox){


totalBox.innerHTML =


"Total : RM "

+

total.toFixed(2);



}


}
// =====================================
// CHECKOUT BUTTON
// =====================================


window.checkout = function(){



if(cart.length===0){


showToast(

"Cart is empty"

);


return;


}





document.getElementById("cartPage")

.style.display="none";



document.getElementById("checkoutPage")

.style.display="block";





loadCustomerCheckout();



};









// =====================================
// LOAD CUSTOMER DETAILS
// =====================================


function loadCustomerCheckout(){



let user =

JSON.parse(

localStorage.getItem("customer")

);





let name =

document.getElementById("customerName");



let phone =

document.getElementById("phone");





if(user){


if(name)

name.value=user.name || "";



if(phone)

phone.value=user.phone || "";



}



}









// =====================================
// PLACE ORDER
// =====================================


window.placeOrder = async function(){



let table =

document.getElementById("tableNumber").value;





if(!table){


showToast(

"Please enter table number"

);


return;


}






let order = {


customer:

document.getElementById("customerName").value,


phone:

document.getElementById("phone").value,



tableNumber:table,



orderType:

localStorage.getItem("orderType")

|| "DINE IN",



items:cart,



status:"NEW",



createdAt:

new Date()




};






try{



await saveOrder(order);





showToast(

"Order Sent Successfully"

);





cart=[];



saveCart();





setTimeout(()=>{


goHome();



},1500);





}

catch(error){



console.error(error);


showToast(

"Order Failed"

);



}



};









// =====================================
// SAVE ORDER FIREBASE
// =====================================


async function saveOrder(order){


const {

db

}= await import("./firebase.js");



const {

collection,

addDoc,

serverTimestamp

}= await import(

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

);





await addDoc(

collection(db,"orders"),


{

...order,

createdAt:

serverTimestamp()


}


);



}









// =====================================
// TOAST
// =====================================


window.showToast=function(msg){



let toast=

document.getElementById("toast");



if(!toast) return;



toast.innerHTML=msg;



toast.classList.add("show");




setTimeout(()=>{


toast.classList.remove("show");


},2500);



};
