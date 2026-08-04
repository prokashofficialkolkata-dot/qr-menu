// =====================================
// RESTORAN HAMEED'S BISTRO
// CASHIER POS V1
// =====================================


import {

db

} from "./firebase.js";



import {

collection,
getDocs,
addDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";







let selectedTable = "";

let orderItems = [];

let menuItems = [];








// =====================================
// LOAD TABLES
// =====================================


function loadTables(){



const box =
document.getElementById(
"tableList"
);



if(!box)return;



box.innerHTML="";





for(let i=1;i<=20;i++){



let btn =
document.createElement(
"button"
);



btn.className =
"tableBtn";



btn.innerHTML =
"Table " + i;




btn.onclick=function(){


selectTable(
"Table " + i
);


};




box.appendChild(btn);



}



}








// =====================================
// SELECT TABLE
// =====================================


window.selectTable=function(table){



selectedTable =
table;



document.getElementById(
"selectedTable"
).innerHTML =
table;





document.getElementById(
"orderSection"
).style.display =
"block";





};









// =====================================
// LOAD MENU
// =====================================


async function loadMenu(){


const box =
document.getElementById(
"cashierMenu"
);



const snap =
await getDocs(

collection(
db,
"menus"
)

);





menuItems=[];



box.innerHTML="";





snap.forEach((item)=>{



let data =
item.data();



menuItems.push({

id:item.id,

...data

});





let div =
document.createElement(
"div"
);



div.className =
"menuCard";





div.innerHTML = `


<h3>
${data.name}
</h3>


<p>
RM ${Number(data.price).toFixed(2)}
</p>



<button onclick="addCashierItem('${item.id}')">

Add

</button>


`;




box.appendChild(div);



});



}









// =====================================
// ADD ITEM
// =====================================


window.addCashierItem=function(id){



let item =

menuItems.find(

x=>x.id===id

);





let exist =

orderItems.find(

x=>x.id===id

);






if(exist){


exist.qty++;


}

else{


orderItems.push({

id:id,

name:item.name,

price:Number(item.price),

qty:1

});


}



updateBill();



};









// =====================================
// UPDATE BILL
// =====================================


function updateBill(){



let total=0;



orderItems.forEach(item=>{


total +=

item.price *

item.qty;


});





document.getElementById(
"orderTotal"
).innerHTML =

"Total: RM "

+

total.toFixed(2);



}








// =====================================
// SEND TO KITCHEN
// =====================================


window.sendKitchen=async function(){



if(!selectedTable){


alert(
"Select Table"
);


return;


}




if(orderItems.length===0){


alert(
"Add Items"
);


return;


}






let total=0;



orderItems.forEach(item=>{


total +=

item.price *

item.qty;


});







await addDoc(

collection(
db,
"orders"
),

{


table:selectedTable,


customerName:"Walk In",


items:orderItems,


totalAmount:total,


status:"Pending",



createdAt:

serverTimestamp()



}

);






alert(
"Sent To Kitchen"
);



orderItems=[];


updateBill();



};










// =====================================
// START
// =====================================


window.onload=function(){


loadTables();


loadMenu();


};
