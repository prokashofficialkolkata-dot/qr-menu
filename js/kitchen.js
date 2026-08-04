// =====================================
// RESTORAN HAMEED'S BISTRO
// KITCHEN DISPLAY SYSTEM V5 GRID
// =====================================


import { db } from "./firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
doc,
updateDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";







// =====================================
// LOAD LIVE ORDERS
// =====================================


function loadKitchenOrders(){



const box =

document.getElementById(
"kitchenOrders"
);



const q =

query(

collection(db,"orders"),

orderBy(

"createdAt",

"desc"

)

);






onSnapshot(q,(snapshot)=>{



box.innerHTML="";






snapshot.forEach((orderDoc)=>{



let order = orderDoc.data();





// hide completed


if(order.status==="Completed"){

return;

}






let itemsHTML="";





order.items.forEach(item=>{


itemsHTML += `

<div class="itemRow">

${item.name}

<strong>
x${item.qty}
</strong>

</div>

`;


});









let card =

document.createElement("div");



card.className=

"kitchenCard";






// status class


if(order.status==="Pending"){


card.classList.add(
"pending"
);


}



if(order.status==="Preparing"){


card.classList.add(
"preparing"
);


}



if(order.status==="Ready"){


card.classList.add(
"ready"
);


}








card.innerHTML = `



<div class="orderHeader">


<h2>

${order.table}

</h2>


<p>

${order.status}

</p>


</div>





<div class="itemsBox">

${itemsHTML}

</div>






<div class="buttonBox">



<button onclick="changeOrderStatus('${orderDoc.id}','Preparing')">

Cooking

</button>



<button onclick="changeOrderStatus('${orderDoc.id}','Ready')">

Ready

</button>



<button onclick="changeOrderStatus('${orderDoc.id}','Completed')">

Done

</button>



</div>



`;






box.appendChild(card);



});



});



}









// =====================================
// CHANGE STATUS
// =====================================


window.changeOrderStatus = async function(

id,

status

){



await updateDoc(

doc(
db,
"orders",
id
),

{


status:status,


updatedAt:

serverTimestamp()



}

);



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
