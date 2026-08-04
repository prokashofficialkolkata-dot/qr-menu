
// =====================================
// CASHIER.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================


import { db } from "./firebase.js";


import {

collection,

query,

orderBy,

onSnapshot,

doc,

updateDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









let cashierOrders=[];









// =====================================
// LOAD ORDERS
// =====================================


function loadCashierOrders(){



let box=document.getElementById(

"cashierOrders"

);



if(!box)return;






const q=query(

collection(db,"orders"),

orderBy(

"createdAt",

"desc"

)

);







onSnapshot(q,(snapshot)=>{



box.innerHTML="";



cashierOrders=[];







snapshot.forEach(item=>{



let data=item.data();






if(

data.status==="PAID"

){

return;

}








cashierOrders.push({

id:item.id,

...data

});









box.innerHTML += `



<div class="cashier-card">





<h2>

Order #${item.id.slice(0,6)}

</h2>






<h3>

Table:

${data.tableNumber || "-"}

</h3>






<p>

Customer:

${data.customerName || ""}

</p>






<p>

Type:

${data.orderType || ""}

</p>






<hr>






${

(data.items || [])

.map(item=>`



<p>

${item.name}

×

${item.qty}

</p>



`)

.join("")

}







<h2>

RM ${Number(

data.total || 0

).toFixed(2)}

</h2>








<button

onclick="completePayment('${item.id}')">


💰 PAYMENT DONE


</button>






</div>



`;





});







if(!cashierOrders.length){



box.innerHTML=

"<h2>No Pending Orders</h2>";



}



});



}











// =====================================
// COMPLETE PAYMENT
// =====================================


window.completePayment = async function(id){



try{



await updateDoc(

doc(

db,

"orders",

id

),

{


status:"PAID",


paidAt:new Date()



}

);





showToast(

"Payment Completed"

);





}

catch(error){



console.error(

"PAYMENT ERROR",

error

);



}



};











// =====================================
// START
// =====================================


window.addEventListener(

"load",

()=>{


loadCashierOrders();



});
