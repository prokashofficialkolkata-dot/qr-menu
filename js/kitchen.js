// =====================================
// RESTORAN HAMEED'S BISTRO
// KITCHEN DISPLAY SYSTEM V3
// =====================================


import {

db

} from "./firebase.js";


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
// LIVE KITCHEN ORDERS
// =====================================


function loadKitchenOrders(){


const box =
document.getElementById(
"kitchenOrders"
);



if(!box)return;



const q =
query(

collection(
db,
"orders"
),

orderBy(
"createdAt",
"desc"
)

);





onSnapshot(

q,

(snapshot)=>{


box.innerHTML="";



snapshot.forEach((item)=>{



const order =
item.data();





if(order.status==="Completed"){

return;

}





const card =
document.createElement(
"div"
);



card.className =
"kitchenCard " +
(order.status || "Pending");






let items="";



(order.items || [])
.forEach((food)=>{


items += `

<div class="foodItem">

${food.name}

× ${food.qty}

</div>

`;



});






card.innerHTML = `


<h2>
ORDER
</h2>


<h3>
${order.customerName || "Customer"}
</h3>


${items}



<h2>
${order.status || "Pending"}
</h2>




<button onclick="changeKitchenStatus('${item.id}','Preparing')">

Preparing

</button>



<button onclick="changeKitchenStatus('${item.id}','Ready')">

Ready

</button>



<button onclick="changeKitchenStatus('${item.id}','Completed')">

Done

</button>


`;



box.appendChild(card);



});



}



);



}







// =====================================
// CHANGE STATUS
// =====================================


window.changeKitchenStatus = async function(

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







// START

window.addEventListener(

"load",

()=>{


loadKitchenOrders();


}

);




export {

loadKitchenOrders

};
