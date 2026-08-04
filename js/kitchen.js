// ==========================================
// RESTORAN HAMEED'S BISTRO
// KITCHEN DISPLAY SYSTEM V6 FINAL
// PART 1
// ==========================================



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









// ==========================================
// LOAD LIVE ORDERS
// ==========================================


function loadKitchenOrders(){



let q = query(


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



kitchenOrders=[];







snapshot.forEach(order=>{



let data = order.data();






if(

data.status !== "COMPLETED"

){



kitchenOrders.push({


id:order.id,

...data


});



}



});







displayKitchenOrders();





}



);



}









// ==========================================
// DISPLAY ORDERS
// ==========================================


function displayKitchenOrders(){



let box =

document.getElementById(

"kitchenOrders"

);






if(!box)return;






box.innerHTML="";








if(kitchenOrders.length===0){



box.innerHTML=



`

<h2>

No Active Orders

</h2>

`;



return;



}








kitchenOrders.forEach(order=>{



let items="";








(order.items || [])

.forEach(item=>{



items +=`



<div class="kitchen-item">


${item.name}

×

${item.qty}



</div>



`;



});








box.innerHTML += `



<div class="kitchen-card">



<h2>

Table :

${order.tableNumber}

</h2>





<p>

${order.orderType}

</p>




${items}






<h3>

Status :

${order.status}

</h3>





<div class="kitchen-buttons">



<button

onclick="changeOrderStatus('${order.id}','COOKING')">

🔥 Cooking

</button>





<button

onclick="changeOrderStatus('${order.id}','READY')">

✅ Ready

</button>





<button

onclick="changeOrderStatus('${order.id}','COMPLETED')">

✔ Complete

</button>



</div>





</div>



`;





});





}
// ==========================================
// CHANGE ORDER STATUS
// ==========================================


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

"Status Update Error",

error

);



}



};









// ==========================================
// NEW ORDER ALERT
// ==========================================


function orderAlert(){



let audio =

new Audio(

"sound/order.mp3"

);




audio.play()

.catch(()=>{});



}









// ==========================================
// START KITCHEN
// ==========================================


window.addEventListener(

"load",

()=>{


loadKitchenOrders();



});
