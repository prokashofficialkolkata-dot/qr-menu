// =====================================
// RESTORAN HAMEED'S BISTRO
// CASHIER POS V3 FINAL
// =====================================

import {

saveSales

} from "./sales.js";

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

let paymentMethod = "Cash";








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





for(let i=1;i<=30;i++){



let btn =
document.createElement(
"button"
);



btn.className =
"tableBtn";



btn.innerHTML =
"Table " + i;




btn.onclick = function(){


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
).style.display="block";



};









// =====================================
// LOAD MENU
// =====================================


async function loadMenu(){


const box =
document.getElementById(
"cashierMenu"
);



if(!box)return;



const snap =
await getDocs(

collection(
db,
"menus"
)

);





box.innerHTML="";

menuItems=[];




snap.forEach((doc)=>{


let item =
doc.data();





menuItems.push({

id:doc.id,

...item

});





let div =
document.createElement(
"div"
);



div.className =
"menuCard";





div.innerHTML = `


<h3>
${item.name}
</h3>


<p>
RM ${Number(item.price).toFixed(2)}
</p>


<button onclick="addCashierItem('${doc.id}')">

ADD

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


const box =
document.getElementById(
"billItems"
);



box.innerHTML="";



let total=0;





orderItems.forEach((item,index)=>{



let amount =
item.price *
item.qty;



total += amount;





let div =
document.createElement(
"div"
);



div.className =
"billRow";




div.innerHTML = `


<b>
${item.name}
</b>


RM ${amount.toFixed(2)}



<button onclick="changeQty(${index},-1)">
-
</button>


${item.qty}


<button onclick="changeQty(${index},1)">
+
</button>



<button onclick="removeItem(${index})">

❌

</button>



`;



box.appendChild(div);



});





document.getElementById(
"orderTotal"
).innerHTML =

"Total: RM "

+

total.toFixed(2);



}









// =====================================
// QUANTITY
// =====================================


window.changeQty=function(index,value){


orderItems[index].qty += value;



if(orderItems[index].qty<=0){


orderItems.splice(index,1);


}



updateBill();



};








// =====================================
// REMOVE ITEM
// =====================================


window.removeItem=function(index){


orderItems.splice(

index,

1

);



updateBill();



};









// =====================================
// PAYMENT
// =====================================


window.selectPayment=function(type){


paymentMethod = type;



alert(

"Payment: " + type

);


};









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
"Add Item"
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


payment:

paymentMethod,


status:"Pending",


createdAt:

serverTimestamp()



}

);


await saveSales(orderItems);



alert(
"Order Sent Kitchen"
);






orderItems=[];



updateBill();



};









// =====================================
// START
// =====================================


window.addEventListener(

"load",

()=>{


loadTables();


loadMenu();
// =====================================
// SPLIT BILL
// =====================================


window.splitBill=function(){


if(orderItems.length===0){

alert("No items");

return;

}



let total =
0;


orderItems.forEach(item=>{


total += item.price * item.qty;


});



let people =
prompt(
"Number of people?"
);



if(!people || people<=0){

return;

}



let each =
total / Number(people);



alert(

"Each Person: RM "

+

each.toFixed(2)

);


};









// =====================================
// COMBINE TABLE
// =====================================


window.combineTable=function(){


let table =
prompt(

"Enter table number to combine"

);



if(!table){

return;

}



alert(

"Combine with Table " + table

);



};









// =====================================
// PRINT RECEIPT
// =====================================


window.printReceipt=function(){



let receipt =

"RESTORAN HAMEED'S BISTRO\n\n";





orderItems.forEach(item=>{


receipt +=

item.name +

" x " +

item.qty +

"\n";


});





receipt +=

"\nTotal: "

+

document.getElementById(

"orderTotal"

).innerText;





console.log(receipt);



window.print();



};


}

);
