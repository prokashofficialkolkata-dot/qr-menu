
// =====================================
// KITCHEN.JS FINAL V5
// Restoran Hameed's Bistro
// Kitchen Display System
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









let kitchenOrders=[];









// =====================================
// LOAD LIVE ORDERS
// =====================================


function loadKitchenOrders(){



let box=document.getElementById(

"kitchenOrders"

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





kitchenOrders=[];






snapshot.forEach(item=>{



let data=item.data();




kitchenOrders.push({


id:item.id,


...data


});





box.innerHTML += `



<div class="kitchen-card">



<h2>

Order #${item.id.slice(0,5)}

</h2>




<h3>

Table:

${data.tableNumber || "-"}

</h3>




<p>

${data.orderType || ""}

</p>





<hr>






${

(data.items || [])

.map(food=>`



<div class="food-item">


<b>

${food.name}

</b>


<br>


Qty:

${food.qty}



</div>



`)

.join("")

}








<h3>

Status:

${data.status || "NEW"}

</h3>








<button

onclick="changeOrderStatus('${item.id}','COOKING')">


🍳 COOKING


</button>






<button

onclick="changeOrderStatus('${item.id}','READY')">


✅ READY


</button>







</div>



`;





});





if(snapshot.empty){



box.innerHTML=

"<h2>No Orders</h2>";



}



});





}












// =====================================
// UPDATE STATUS
// =====================================


window.changeOrderStatus = async function(id,status){



try{



await updateDoc(

doc(

db,

"orders",

id

),

{


status:status


}

);





}

catch(error){



console.error(

"STATUS ERROR",

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


loadKitchenOrders();


}

);
