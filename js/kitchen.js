// =====================================
// RESTORAN HAMEED'S BISTRO
// KITCHEN DISPLAY SYSTEM V2
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





let firstLoad=true;







// =====================================
// LIVE ORDERS
// =====================================


window.loadKitchenOrders=function(){


const box =
document.getElementById(
"kitchenOrders"
);



if(!box)return;





const q = query(

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



let newOrder=false;






snapshot.forEach((item)=>{


const order =
item.data();





if(
order.status==="Completed"
){

return;

}





if(
firstLoad===false
&&
order.status==="Pending"

){

newOrder=true;


}






createOrderCard(

item.id,

order,

box

);



});





if(newOrder){


playAlert();


}



firstLoad=false;



}



);



};











// =====================================
// CREATE CARD
// =====================================


function createOrderCard(

id,

order,

box

){



const div =
document.createElement(
"div"
);



div.className =
"kitchenCard " 
+
(order.status || "Pending");






let itemHTML="";




(order.items || [])
.forEach(item=>{


itemHTML += `


<div class="foodItem">

${item.name}

×

${item.qty}


</div>


`;



});






div.innerHTML=`



<h2>
ORDER
</h2>



<h3>
${order.customerName || ""}
</h3>



<div>

${itemHTML}

</div>



<h2>
${order.status || "Pending"}
</h2>




<button onclick="changeKitchenStatus('${id}','Preparing')">

Preparing

</button>



<button onclick="changeKitchenStatus('${id}','Ready')">

Ready

</button>



<button onclick="changeKitchenStatus('${id}','Completed')">

Done

</button>



`;





box.appendChild(div);



}









// =====================================
// UPDATE STATUS
// =====================================


window.changeKitchenStatus=async function(

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
// SOUND ALERT
// =====================================


function playAlert(){



let audio =
new Audio(

"sound/new-order.mp3"

);



audio.play()
.catch(()=>{});



}
