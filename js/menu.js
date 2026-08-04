// =====================================
// MENU SYSTEM V5
// Restoran Hameed's Bistro
// =====================================


import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy,
limit
}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





let menuData = [];

let currentOrderType = "DINE IN";






// =====================================
// START MENU
// =====================================


window.startMenu = function(type){

currentOrderType = type;


localStorage.setItem(
"orderType",
type
);


document.getElementById("welcome")
.style.display="none";


document.getElementById("menuPage")
.style.display="block";



let display =
document.getElementById("orderTypeDisplay");


if(display){

display.innerHTML = type;

}



loadMenu();


};







// =====================================
// LOAD MENU FROM FIRESTORE
// =====================================


async function loadMenu(){


try{


const snapshot =
await getDocs(
collection(db,"menus")
);



menuData=[];



snapshot.forEach(doc=>{


menuData.push({

id:doc.id,

...doc.data()

});


});




showPopular();


showAllMenu();



}

catch(error){


console.error(
"Menu Load Error:",
error
);


}



}
// =====================================
// SHOW TOP 15 POPULAR ITEMS
// =====================================


window.showPopular = function(){


let box = 
document.getElementById("popularItems");



if(!box) return;



box.innerHTML = "";




// Sort by selling count

let popular = 
[...menuData]

.sort((a,b)=>

(b.sold || 0) - (a.sold || 0)

)

.slice(0,15);





popular.forEach(item=>{


box.innerHTML += `

<div class="popular-card">


<h3>

${item.name}

</h3>



<p>

RM ${getPrice(item)}

</p>



<button

onclick="addToCart('${item.id}')">


➕ ADD


</button>



</div>


`;



});



};









// =====================================
// SHOW ALL MENU ITEMS
// =====================================


function showAllMenu(){


let box = 
document.getElementById("itemBox");



if(!box) return;



box.innerHTML="";





menuData.forEach(item=>{



box.innerHTML += `

<div class="menu-item">


<h3>

${item.name}

</h3>



<p>

${item.category}

</p>



<p>

RM ${getPrice(item)}

</p>




<button

onclick="addToCart('${item.id}')">


➕ ADD TO CART


</button>



</div>


`;



});



}









// =====================================
// PRICE SWITCH
// =====================================


function getPrice(item){



let type =

localStorage.getItem("orderType")

|| currentOrderType;





if(type==="TAKE AWAY"){


return Number(

item.takeAwayPrice || 0

)

.toFixed(2);



}



return Number(

item.dineInPrice || 0

)

.toFixed(2);



}









// =====================================
// CHANGE ORDER TYPE
// =====================================


window.changeOrderType = function(type){


currentOrderType = type;


localStorage.setItem(

"orderType",

type

);



showPopular();

showAllMenu();



}
// =====================================
// REFRESH MENU
// =====================================


window.refreshMenu = function(){

loadMenu();

};







// =====================================
// BACK TO HOME
// =====================================


window.goHome = function(){


document.getElementById("welcome")
.style.display="block";


document.getElementById("menuPage")
.style.display="none";


document.getElementById("cartPage")
.style.display="none";


document.getElementById("checkoutPage")
.style.display="none";


};








// =====================================
// BACK BUTTON
// =====================================


window.goBack = function(){


document.getElementById("cartPage")
.style.display="none";


document.getElementById("checkoutPage")
.style.display="none";


document.getElementById("menuPage")
.style.display="block";


};









// =====================================
// ADD TO CART CONNECTOR
// =====================================


window.addMenuItem = function(id){


addToCart(id);


};








// =====================================
// ORDER TYPE CHECK
// =====================================


let savedType =

localStorage.getItem("orderType");



if(savedType){

currentOrderType = savedType;

}







// =====================================
// AUTO LOAD MENU IF PAGE OPEN
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{


let menu =

document.getElementById("menuPage");



if(menu && 

menu.style.display==="block"){


loadMenu();


}



}

);
