// =====================================
// RESTORAN HAMEED'S BISTRO
// CHECKOUT.JS V2
// PART 1
// =====================================


import {
    db,
    auth
} from "./firebase.js";


import {

    collection,
    addDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";




// =====================================
// OPEN CHECKOUT FORM
// =====================================

window.openCheckoutForm=function(){


const form =
document.getElementById(
"checkoutForm"
);



const profile =
document.getElementById(
"customerProfileBox"
);



if(form){

form.style.display="block";

}



if(profile){

profile.style.display="none";

}



};





// =====================================
// PLACE ORDER
// =====================================

window.placeOrder = async function(){


try{


const user =
auth.currentUser;



if(!user){


showToast(
"Please login first"
);


return;


}



const name =
document.getElementById(
"orderName"
).value.trim();



const phone =
document.getElementById(
"orderPhone"
).value.trim();



const table =
document.getElementById(
"tableNumber"
)?.value || "";



if(!name || !phone){


showToast(
"Please enter details"
);


return;


}



const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];



if(cart.length===0){


showToast(
"Cart empty"
);


return;


}
// =====================================
// CALCULATE TOTAL
// =====================================


let total = 0;



cart.forEach((item)=>{


total += Number(item.price) * Number(item.qty || 1);


});




// =====================================
// SAVE ORDER TO FIRESTORE
// =====================================


const orderData = {


customerId:user.uid,


customerName:name,


phone:phone,


tableNumber:table,


orderType:
localStorage.getItem("orderType") || "Dine In",



items:cart,



totalAmount:total,



status:"Pending",



createdAt:serverTimestamp()



};





const orderRef =
await addDoc(

collection(
db,
"orders"
),

orderData

);





console.log(
"Order ID:",
orderRef.id
);





// =====================================
// ORDER SUCCESS
// =====================================


localStorage.removeItem(
"cart"
);



showToast(
"Order Placed Successfully"
);



setTimeout(()=>{


showPage("welcome");



},1500);





}


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
