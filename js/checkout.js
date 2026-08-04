// ==========================================
// RESTORAN HAMEED'S BISTRO
// CHECKOUT SYSTEM V6 FINAL
// PART 1
// ==========================================


import { db } from "./firebase.js";



import {

collection,

addDoc,

serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";








// ==========================================
// OPEN CHECKOUT
// ==========================================


window.checkout=function(){



let cart =

JSON.parse(

localStorage.getItem(

"cart"

)

)

|| [];







if(cart.length===0){


showToast(

"Cart Empty"

);


return;


}








document.getElementById(

"cartPage"

).style.display="none";







document.getElementById(

"checkoutPage"

).style.display="block";







loadCustomerCheckout();



};











// ==========================================
// LOAD CUSTOMER DATA
// ==========================================


function loadCustomerCheckout(){



let customer =

JSON.parse(

localStorage.getItem(

"customer"

)

)

|| {};







let name =

document.getElementById(

"customerName"

);



let phone =

document.getElementById(

"phone"

);







if(name){


name.value =

customer.name || "";



}



if(phone){


phone.value =

customer.phone || "";



}



}
// ==========================================
// PLACE ORDER
// ==========================================


window.placeOrder = async function(){



let cart =

JSON.parse(

localStorage.getItem(

"cart"

)

)

|| [];







if(cart.length===0){


showToast(

"Cart Empty"

);


return;


}







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









let total =

cart.reduce(

(sum,item)=>

sum +

(

Number(item.price)

*

Number(item.qty)

),

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



let result =

await addDoc(

collection(

db,

"orders"

),

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

"Order Error",

error

);



showToast(

"Order Failed"

);



}



};









// ==========================================
// AUTO LOAD
// ==========================================


window.addEventListener(

"load",

()=>{



loadCustomerCheckout();



});
