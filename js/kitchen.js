// =====================================
// RESTORAN HAMEED'S BISTRO
// KITCHEN DISPLAY SYSTEM V1
// =====================================


import {

db

} from "./firebase.js";


import {

collection,
getDocs,
query,
orderBy,
doc,
updateDoc,
onSnapshot,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





// =====================================
// LOAD LIVE ORDERS
// =====================================


window.loadKitchenOrders = function(){



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




snapshot.forEach((item)=>{



const order =
item.data();





if(order.status==="Completed"){


return;


}






const div =
document.createElement(
"div"
);



div.className =
"kitchenCard";






let items="";



(order.items || []).forEach((i)=>{


items += `

<p>
${i.name} × ${i.qty}
</p>

`;


});






div.innerHTML = `


<h2>
Order
</h2>


<p>
Customer:
${order.customerName || ""}
</p>



${items}



<h3>
Status:
${order.status || "Pending"}
</h3>




<button onclick="changeKitchenStatus('${item.id}','Preparing')">

Preparing

</button>



<button onclick="changeKitchenStatus('${item.id}','Ready')">

Ready

</button>



<button onclick="changeKitchenStatus('${item.id}','Completed')">

Complete

</button>



`;





box.appendChild(div);



});



}



);



};









// =====================================
// CHANGE STATUS
// =====================================


window.changeKitchenStatus = async function(
id,
status
){



try{


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




}



catch(error){


console.log(error);



}



};
