import { db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


// Checkout Form Open

window.openCheckoutForm = function(){

document.getElementById("loginBox").style.display="none";
document.getElementById("createBox").style.display="none";
document.getElementById("phoneBox").style.display="none";

document.getElementById("checkoutForm").style.display="block";

document.getElementById("customerName").value =
localStorage.getItem("customerName") || "";

document.getElementById("phone").value =
localStorage.getItem("customerPhone") || "";

document.getElementById("customerName").readOnly=true;
document.getElementById("phone").readOnly=true;

if(selectedType=="DINE IN"){

document.getElementById("tableInput").innerHTML=`

<input
id="tableNumber"
placeholder="Enter Table Number"
required>

`;

}else{

document.getElementById("tableInput").innerHTML=`

<b>TAKE AWAY</b>

`;

}

};


// Place Order

window.placeOrder = async function(){

let customerName =
document.getElementById("customerName").value.trim();

let phone =
document.getElementById("phone").value.trim();

let table="TAKE AWAY";

if(selectedType=="DINE IN"){

let tableInput =
document.getElementById("tableNumber");

if(!tableInput || tableInput.value.trim()==""){

alert("Please Enter Table Number");

return;

}

table=tableInput.value.trim();

}

if(cart.length==0){

alert("Cart Empty");

return;

}

try{

await addDoc(collection(db,"orders"),{

customerName,

phone,

tableNumber:table,

type:selectedType,

items:cart,

status:"NEW",

time:new Date()

});

alert("Order Sent Successfully");

cart=[];

localStorage.removeItem("cart");

goHome();

}catch(error){

alert(error.message);

}

};
