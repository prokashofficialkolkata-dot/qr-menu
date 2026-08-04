// =====================================
// RESTORAN HAMEED'S BISTRO
// CASHIER POS FINAL V4
// =====================================


import { db } from "./firebase.js";


import {

collection,
getDocs,
addDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



import {

saveSales

} from "./sales.js";






let menuItems = [];

let orderItems = [];

let selectedTable = "";

let priceType = "dine";

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



let button =

document.createElement(
"button"
);



button.className="tableBtn";



button.innerHTML =
"Table " + i;



button.onclick=function(){


selectTable(
"Table " + i
);


};




box.appendChild(button);



}



}









// =====================================
// SELECT TABLE
// =====================================


window.selectTable=function(table){



selectedTable = table;



document.getElementById(

"selectedTable"

).innerHTML = table;




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



box.innerHTML="";





const snap =

await getDocs(

collection(
db,
"menus"

)

);






menuItems=[];





snap.forEach((doc)=>{


menuItems.push({

id:doc.id,

...doc.data()

});



});





displayMenu();



}









// =====================================
// DISPLAY MENU
// =====================================


function displayMenu(){



const box =

document.getElementById(
"cashierMenu"
);



box.innerHTML="";





menuItems.forEach(item=>{


let price =

priceType==="dine"

?

item.dineInPrice

:

item.takeAwayPrice;






let div =

document.createElement(
"div"
);



div.className="menuCard";




div.innerHTML=`


<h3>

${item.name}

</h3>


<p>

RM ${Number(price).toFixed(2)}

</p>



<button onclick="addItem('${item.id}')">

ADD

</button>



`;



box.appendChild(div);



});



}









// =====================================
// CHANGE PRICE TYPE
// =====================================


window.changePriceType=function(type){


priceType = type;


displayMenu();



};









// =====================================
// ADD ITEM
// =====================================


window.addItem=function(id){



let item =

menuItems.find(

x=>x.id===id

);





let exist =

orderItems.find(

x=>x.id===id

);






let price =

priceType==="dine"

?

item.dineInPrice

:

item.takeAwayPrice;






if(exist){


exist.qty++;


}

else{


orderItems.push({


id:id,


name:item.name,


price:Number(price),


qty:1



});


}



updateBill();



};









// =====================================
// UPDATE BILL
// =====================================


function updateBill(){



let box =

document.getElementById(
"billItems"
);



if(!box)return;



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



div.className="billRow";



div.innerHTML=`


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


orderItems.splice(index,1);



updateBill();



};









// =====================================
// PAYMENT
// =====================================


window.selectPayment=function(type){


paymentMethod = type;



alert(

"Payment: "+type

);



};









// =====================================
// SEND ORDER TO KITCHEN
// =====================================


window.sendKitchen=async function(){



if(!selectedTable){


alert(
"Please Select Table"
);


return;


}





if(orderItems.length===0){


alert(
"No Items Added"
);


return;


}






let total=0;



orderItems.forEach(item=>{


total +=

item.price *

item.qty;


});









// SAVE KITCHEN ORDER


await addDoc(

collection(
db,
"orders"

),

{


table:selectedTable,


items:orderItems,


totalAmount:total,


paymentMethod:paymentMethod,


status:"Pending",


createdAt:

serverTimestamp()



}

);








// SAVE SALES


await saveSales(

orderItems

);








alert(

"Order Sent To Kitchen"

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



}

);
