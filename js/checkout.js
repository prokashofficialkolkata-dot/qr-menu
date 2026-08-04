// =====================================
// RESTORAN HAMEED'S BISTRO
// CHECKOUT.JS V3 FINAL
// =====================================


import {

auth,
db

} from "./firebase.js";



import {

collection,
addDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";







// =====================================
// SUBMIT ORDER
// =====================================


window.submitOrder = async function(){


try{


const user =
auth.currentUser;



const name =
document
.getElementById("customerName")
.value
.trim();



const phone =
document
.getElementById("customerPhone")
.value
.trim();



const address =
document
.getElementById("customerAddress")
.value
.trim();





if(!name || !phone){


showToast(
"Please enter name and phone"
);



return;


}





let cart = JSON.parse(

localStorage.getItem("cart")

) || [];





if(cart.length===0){


showToast(
"Cart is empty"
);



return;


}







let total=0;



cart.forEach(item=>{


total +=

Number(item.price) *

Number(item.qty);



});








const orderData = {


customerId:

user ?

user.uid

:

"guest",



customerName:name,


phone:phone,


address:address,



items:cart,



totalAmount:

total,



status:

"Pending",



createdAt:

serverTimestamp()



};







await addDoc(

collection(

db,

"orders"

),

orderData

);








showToast(
"Order Successful"
);






localStorage.removeItem(
"cart"
);





if(typeof displayCart==="function"){

displayCart();

}





};



catch(error){


console.log(
"Order Error:",
error
);



showToast(
error.message
);



}



};
