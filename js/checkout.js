// =====================================
// checkout.js FINAL V5
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


window.checkout=function(){



let cart = JSON.parse(

localStorage.getItem("cart")

)

|| [];





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



};









// =====================================
// PLACE ORDER
// =====================================


window.placeOrder = async function(){



let cart = JSON.parse(

localStorage.getItem("cart")

)

|| [];





let name =

document.getElementById(

"customerName"

).value;




let phone =

document.getElementById(

"phone"

).value;




let table =

document.getElementById(

"tableNumber"

).value;







if(!table){


showToast(

"Enter Table Number"

);


return;


}








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


},1500);




}

catch(error){



console.error(

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


window.showToast=function(text){



let box=

document.getElementById(

"toast"

);



if(!box)return;



box.innerHTML=text;



box.classList.add(

"show"

);




setTimeout(()=>{


box.classList.remove(

"show"

);


},2500);



};
