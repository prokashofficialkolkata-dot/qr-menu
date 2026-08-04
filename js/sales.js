// =====================================
// RESTORAN HAMEED'S BISTRO
// SALES SYSTEM V1
// =====================================


import { db } from "./firebase.js";


import {

collection,
addDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";









// =====================================
// SAVE SALES AFTER PAYMENT
// =====================================


export async function saveSales(orderItems){



try{



for(let item of orderItems){



await addDoc(

collection(
db,
"sales"
),

{


name:item.name,


qty:Number(item.qty),


total:

Number(item.price)

*

Number(item.qty),



createdAt:

serverTimestamp()



}

);



}




console.log(
"Sales Saved"
);



}



catch(error){


console.log(

"Sales Error",

error

);



}



}
