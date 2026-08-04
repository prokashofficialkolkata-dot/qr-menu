// =====================================
// menu.js FINAL V5
// Restoran Hameed's Bistro
// Firebase Dynamic Menu
// =====================================


import { db } from "./firebase.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





let menuData = [];

let selectedOrderType = 
localStorage.getItem("orderType")
||
"DINE IN";








// =====================================
// START MENU
// =====================================


window.startMenu = function(type){


selectedOrderType = type;


localStorage.setItem(

"orderType",

type

);




document.getElementById("welcome")
.style.display="none";



document.getElementById("menuPage")
.style.display="block";





loadMenu();



};








// =====================================
// LOAD MENU FROM FIREBASE
// =====================================


async function loadMenu(){


try{


const snapshot = await getDocs(

collection(db,"menus")

);




menuData=[];



snapshot.forEach(doc=>{


let d = doc.data();



menuData.push({


id:doc.id,


category:

d.category || "",



name:

d["Item Name"] || "",



dineInPrice:

Number(

d["Dine in price"] || 0

),



takeAwayPrice:

Number(

d["Take away Price"] || 0

),



sold:

Number(

d.sold || 0

)



});



});






showPopular();



showMenu();



}

catch(error){


console.error(

"MENU LOAD ERROR",

error

);



}



}








// =====================================
// GET PRICE
// =====================================


function getPrice(item){


if(selectedOrderType==="TAKE AWAY"){


return item.takeAwayPrice;


}


return item.dineInPrice;


}









// =====================================
// TOP 15 POPULAR
// =====================================


function showPopular(){



let box =

document.getElementById(

"popularItems"

);



if(!box) return;




box.innerHTML="";



let popular =

[...menuData]

.sort(

(a,b)=>

b.sold-a.sold

)

.slice(0,15);





popular.forEach(item=>{



box.innerHTML += `



<div class="popular-card">


<h3>

${item.name}

</h3>



<p>

RM ${getPrice(item).toFixed(2)}

</p>



<button onclick="addToCart('${item.id}')">


➕ ADD


</button>



</div>



`;



});



}








// =====================================
// ALL MENU
// =====================================


function showMenu(){



let box =

document.getElementById(

"itemBox"

);



if(!box)return;




box.innerHTML="";





menuData.forEach(item=>{


box.innerHTML +=`



<div class="menu-item">



<h3>

${item.name}

</h3>



<p>

${item.category}

</p>



<p>

RM ${getPrice(item).toFixed(2)}

</p>




<button onclick="addToCart('${item.id}')">


ADD TO CART


</button>



</div>



`;



});



}









// =====================================
// CHANGE ORDER TYPE
// =====================================


window.changeOrderType=function(type){


selectedOrderType=type;



localStorage.setItem(

"orderType",

type

);



showPopular();

showMenu();



};
