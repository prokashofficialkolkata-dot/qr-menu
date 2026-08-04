// ==========================================
// RESTORAN HAMEED'S BISTRO
// SALES REPORT SYSTEM V2
// PART 1
// ==========================================


import { db } from "./firebase.js";


import {

collection,

getDocs

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





let salesOrders=[];








// ==========================================
// LOAD SALES DATA
// ==========================================


async function loadSalesReport(){


try{



let snap = await getDocs(

collection(

db,

"orders"

)

);





salesOrders=[];




snap.forEach(doc=>{


salesOrders.push({

id:doc.id,

...doc.data()

});


});





calculateSales();





}

catch(error){



console.error(

"Sales Load Error",

error

);



}



}










// ==========================================
// CALCULATE SALES
// ==========================================


function calculateSales(){



let total = 0;


let itemSales={};


let categorySales={};








salesOrders.forEach(order=>{



(order.items || [])

.forEach(item=>{



let amount =

Number(item.price || 0)

*

Number(item.qty || 1);





total += amount;





if(!itemSales[item.name]){


itemSales[item.name]=0;


}



itemSales[item.name]+=

Number(item.qty || 1);





});



});







showTotal(

total

);



showTopItems(

itemSales

);



}
// ==========================================
// SHOW TOTAL SALES
// ==========================================


function showTotal(total){



let box =

document.getElementById(

"totalSales"

);



if(box){


box.innerHTML =

"RM "

+

total.toFixed(2);



}






let orders =

document.getElementById(

"totalOrders"

);



if(orders){


orders.innerHTML =

salesOrders.length;



}



}









// ==========================================
// TOP 50 ITEMS
// ==========================================


function showTopItems(data){



let list = [];





Object.keys(data)

.forEach(name=>{


list.push({

name:name,

qty:data[name]

});


});






list.sort(

(a,b)=>b.qty-a.qty

);







let top =

list.slice(0,50);






let box =

document.getElementById(

"topItemsList"

);



if(!box)return;




box.innerHTML="";





top.forEach((item,index)=>{



box.innerHTML += `



<div class="sales-item">


<span>

${index+1}. ${item.name}

</span>



<b>

${item.qty} Sold

</b>



</div>



`;



});







if(top[0]){



let topBox =

document.getElementById(

"topItem"

);



if(topBox){


topBox.innerHTML=

top[0].name;



}



}



}









// ==========================================
// CATEGORY SALES
// ==========================================


function showCategorySales(){



let category={};





salesOrders.forEach(order=>{



(order.items || [])

.forEach(item=>{



let cat =

item.category || "Other";






let amount =

Number(item.price || 0)

*

Number(item.qty || 1);







if(!category[cat]){


category[cat]=0;


}




category[cat]+=amount;





});



});









let box =

document.getElementById(

"categorySalesList"

);




if(!box)return;






box.innerHTML="";






Object.keys(category)

.forEach(cat=>{



box.innerHTML +=`



<div class="sales-item">


<span>

${cat}

</span>



<b>

RM ${category[cat].toFixed(2)}

</b>



</div>



`;



});





}









// ==========================================
// START SALES REPORT
// ==========================================


window.addEventListener(

"load",

()=>{


if(

localStorage.getItem(

"adminLogin"

)==="yes"

){



loadSalesReport();


showCategorySales();



}



});
