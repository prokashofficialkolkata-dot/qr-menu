// =====================================
// RESTORAN HAMEED'S BISTRO
// CHECKOUT.JS FINAL
// =====================================


import {

db,
auth

} from "./firebase.js";



import {

doc,
getDoc,
addDoc,
collection,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";




// ================================
// LOAD CUSTOMER DETAILS
// ================================


async function loadCustomerData(){


let user = auth.currentUser;


if(!user)return;



let ref =
doc(
db,
"customers",
user.uid
);



let snap =
await getDoc(ref);



if(snap.exists()){


let data=snap.data();



let name =
document.getElementById(
"customerName"
);


let phone =
document.getElementById(
"phone"
);



if(name)

name.value =
data.name || "";



if(phone)

phone.value =
data.phone || "";



}



}







// ================================
// PLACE ORDER
// ================================


window.placeOrder = async function(){



let user =
auth.currentUser;



if(!user){


showToast(
"Please Login First"
);


return;


}






let table =
document.getElementById(
"tableNumber"
).value.trim();





let cart =
JSON.parse(
localStorage.getItem("cart")
)
|| [];





if(cart.length===0){


showToast(
"Cart Empty"
);


return;


}






let customerName =
document.getElementById(
"customerName"
).value;




let phone =
document.getElementById(
"phone"
).value;







try{


await addDoc(

collection(
db,
"orders"
),

{


customerId:user.uid,


customerName:customerName,


phone:phone,


tableNumber:table,


orderType:
localStorage.getItem("orderType")
|| "",



items:cart,


status:"Pending",


createdAt:
serverTimestamp()



}


);





localStorage.removeItem(
"cart"
);





if(typeof updateCartCount==="function"){

updateCartCount();

}




showToast(
"Order Placed Successfully"
);





setTimeout(()=>{


goHome();


},1500);






}

catch(error){


console.log(error);


showToast(
error.message
);


}



};









// ================================
// AUTH CHANGE
// ================================


auth.onAuthStateChanged(

(user)=>{


if(user){


loadCustomerData();


}


}

);
