// ==========================================
// RESTORAN HAMEED'S BISTRO
// KITCHEN DISPLAY SYSTEM V2
// Firebase Live Kitchen
// ==========================================


import { db } from "./firebase.js";


import {

collection,
query,
orderBy,
onSnapshot,
updateDoc,
doc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





let kitchenOrders = [];

let autoRefresh = true;





// ==========================================
// LOAD ORDERS LIVE
// ==========================================


function loadKitchenOrders(){


const q = query(

collection(db,"orders"),

orderBy(
"createdAt",
"desc"
)

);



onSnapshot(q,(snapshot)=>{


kitchenOrders=[];



snapshot.forEach((item)=>{


let data=item.data();


kitchenOrders.push({

id:item.id,

...data


});


});



renderOrders();

updateSummary();



playNewOrderSound();



});



}





// ==========================================
// START
// ==========================================


window.addEventListener(
"load",
()=>{


loadKitchenOrders();


startClock();


setupButtons();


}

);
// ==========================================
// RENDER ORDERS
// ==========================================


function renderOrders(){


let box =
document.getElementById(
"kitchenOrders"
);



let loading =
document.getElementById(
"loadingScreen"
);



if(loading){

loading.style.display="none";

}



if(!box)return;



box.innerHTML="";





let search =
(document.getElementById("searchOrder")?.value || "")
.toLowerCase();



let filter =
document.getElementById("statusFilter")?.value
||
"ALL";





let filtered =
kitchenOrders.filter(order=>{


let text =

(

order.customerName
||
""

+

order.tableNumber
||
""

).toLowerCase();





let statusMatch =

filter==="ALL"

?

true

:

order.status===filter;





return (

text.includes(search)

&&

statusMatch

);



});






if(filtered.length===0){


box.innerHTML=

`

<div class="empty-orders">

🍽 No Orders Found

</div>

`;

return;


}







filtered.forEach(order=>{





let statusClass =

order.status==="READY"

?

"status-ready"

:

order.status==="COOKING"

?

"status-cooking"

:

"status-new";








let itemsHTML="";




(order.items || []).forEach(item=>{


itemsHTML += `


<div class="food-item">


<b>

${item.name}

</b>



<span>

x ${item.qty}

</span>


</div>


`;



});






box.innerHTML += `


<div class="kitchen-card">



<div class="order-time">

${getOrderTime(order.createdAt)}

</div>




<h2>

Order #${order.id.substring(0,5)}

</h2>



<h3>

Table : ${order.tableNumber || "-"}

</h3>



<p>

Customer :

${order.customerName || "Walk In"}

</p>



<p>

Type :

${order.orderType || "DINE IN"}

</p>




<hr>




${itemsHTML}





<div class="status-badge ${statusClass}">

${order.status || "NEW"}

</div>





<div class="order-actions">



<button

class="btn-cooking"

onclick="changeStatus('${order.id}','COOKING')">

🍳 Cooking

</button>





<button

class="btn-ready"

onclick="changeStatus('${order.id}','READY')">

✅ Ready

</button>




<button

class="btn-complete"

onclick="changeStatus('${order.id}','COMPLETED')">

✔ Done

</button>



</div>




</div>



`;



});



}







// ==========================================
// SEARCH
// ==========================================


document.addEventListener(

"input",

(e)=>{


if(e.target.id==="searchOrder"){


renderOrders();


}



}

);








// ==========================================
// FILTER
// ==========================================


document.addEventListener(

"change",

(e)=>{


if(e.target.id==="statusFilter"){


renderOrders();


}


}

);
// ==========================================
// CHANGE ORDER STATUS
// ==========================================


window.changeStatus = async function(id,status){


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




showToast(

"Order " + status

);



}

catch(error){


console.error(
"Status Update Error",
error
);


showToast(
"Update Failed"
);


}



};









// ==========================================
// UPDATE SUMMARY
// ==========================================


function updateSummary(){



let pending = 0;

let cooking = 0;

let ready = 0;



kitchenOrders.forEach(order=>{


if(
order.status==="COOKING"
){

cooking++;

}

else if(
order.status==="READY"
){

ready++;

}

else{

pending++;

}



});





let p =
document.getElementById(
"pendingCount"
);


let c =
document.getElementById(
"cookingCount"
);


let r =
document.getElementById(
"readyCount"
);




if(p)
p.innerHTML=pending;


if(c)
c.innerHTML=cooking;


if(r)
r.innerHTML=ready;



}









// ==========================================
// LIVE CLOCK
// ==========================================


function startClock(){


setInterval(()=>{


let clock =
document.getElementById(
"liveClock"
);



if(clock){


let now =
new Date();



clock.innerHTML =

now.toLocaleTimeString();



}



},1000);



}









// ==========================================
// ORDER TIME
// ==========================================


function getOrderTime(timestamp){



if(!timestamp)return "";



let date;



if(timestamp.toDate){


date =
timestamp.toDate();


}

else{


date =
new Date(timestamp);


}





let diff =

Math.floor(

(
new Date()

-
date

)

/

60000

);





if(diff<1){

return "Just Now";

}



return diff+" min ago";



}









// ==========================================
// NEW ORDER SOUND
// ==========================================


function playNewOrderSound(){



let sound =
document.getElementById(
"newOrderSound"
);



if(sound && autoRefresh){


sound.play()
.catch(()=>{});


}



}









// ==========================================
// BUTTON SETUP
// ==========================================


function setupButtons(){



let refresh =
document.getElementById(
"refreshBtn"
);



if(refresh){


refresh.onclick=function(){


renderOrders();


showToast(
"Refreshed"
);


};


}





let full =
document.getElementById(
"fullscreenBtn"
);



if(full){


full.onclick=function(){



if(
!document.fullscreenElement
){


document.documentElement.requestFullscreen();


}

else{


document.exitFullscreen();


}



};



}






let auto =
document.getElementById(
"autoRefreshBtn"
);



if(auto){



auto.onclick=function(){



autoRefresh =
!autoRefresh;



auto.innerHTML =

autoRefresh

?

"🟢 Auto Refresh"

:

"🔴 Paused";



};



}



}









// ==========================================
// TOAST
// ==========================================


window.showToast=function(text){



let toast =
document.getElementById(
"toast"
);



if(!toast)return;



toast.innerHTML=text;


toast.classList.add(
"show"
);



setTimeout(()=>{


toast.classList.remove(
"show"
);



},2000);



};
