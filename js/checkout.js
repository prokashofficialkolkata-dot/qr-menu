
// =====================================
// CHECKOUT.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================


import { db } from "./firebase.js";


import {

collection,

addDoc,

serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// =====================================
// OPEN CHECKOUT
// =====================================


window.openCheckoutForm=function(){



let customer = JSON.parse(

localStorage.getItem("customer")

)

|| {};





let name=document.getElementById(

"customerName"

);



let phone=document.getElementById(

"phone"

);






if(name){


name.value = customer.name || "";


}



if(phone){


phone.value = customer.phone || "";


}






let form=document.getElementById(

"checkoutForm"

);



let login=document.getElementById(

"loginBox"

);



if(form){


form.style.display="block";


}



if(login){


login.style.display="none";


}



};









// =====================================
// CHECKOUT BUTTON
// =====================================


window.checkout=function(){



let cart = JSON.parse(

localStorage.getItem("cart")

)

|| [];






if(cart.length===0){


showToast("Cart Empty");


return;


}






document.getElementById("cartPage")

.style.display="none";




document.getElementById("checkoutPage")

.style.display="block";





if(window.openCheckoutForm){


openCheckoutForm();


}



};









// =====================================
// PLACE ORDER
// =====================================


window.placeOrder = async function(){



let cart = JSON.parse(

localStorage.getItem("cart")

)

|| [];





if(cart.length===0){


showToast("Cart Empty");


return;


}







let name=document.getElementById(

"customerName"

).value;





let phone=document.getElementById(

"phone"

).value;





let table=document.getElementById(

"tableNumber"

).value;








if(!table){


showToast(

"Enter Table Number"

);


return;


}









let total = cart.reduce(

(sum,item)=>

sum+(item.price*item.qty),

0

);









let order = {


customerName:name,


phone:phone,



tableNumber:table,



orderType:

localStorage.getItem(

"orderType"

)

||

"DINE IN",





items:cart,




total:total,




status:"NEW",




createdAt:

serverTimestamp()



};









try{



await addDoc(

collection(db,"orders"),

order

);





showToast(

"Order Sent Kitchen"

);







localStorage.removeItem(

"cart"

);






setTimeout(()=>{


goHome();


location.reload();


},1500);







}

catch(error){



console.error(

"ORDER ERROR",

error

);



showToast(

"Order Failed"

);



}



};









// =====================================
// TOAST
// =====================================


window.showToast = window.showToast || function(msg){



let t=document.getElementById(

"toast"

);



if(t){



t.innerHTML=msg;



t.classList.add("show");



setTimeout(()=>{


t.classList.remove("show");


},2000);



}



};
