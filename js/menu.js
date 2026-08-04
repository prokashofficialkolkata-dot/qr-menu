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





// Make global

window.menuData = menuData;







// =====================================
// START MENU
// =====================================


window.startMenu = function(type){


selectedOrderType = type;


localStorage.setItem(

"orderType",

type

);



let welcome =
document.getElementById("welcome");


let menuPage =
document.getElementById("menuPage");



if(welcome){

welcome.style.display="none";

}



if(menuPage){

menuPage.style.display="block";

}



loadMenu();



};









// =====================================
// LOAD MENU FIREBASE
// =====================================


async function loadMenu(){



try{


const snapshot = await getDocs(

collection(db,"menus")

);




menuData.length = 0;




snapshot.forEach((doc)=>{



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





// update global

window.menuData = menuData;





showPopular();


showMenu();





}

catch(error){


console.error(

"MENU LOAD ERROR",

error

);


showToast(

"Menu Loading Failed"

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
// POPULAR TOP 15
// =====================================


function showPopular(){



let box =

document.getElementById(

"popularItems"

);



if(!box)return;



box.innerHTML="";





let popular =

[...menuData]

.sort(

(a,b)=>

b.sold-a.sold

)

.slice(0,15);






popular.forEach(item=>{



box.innerHTML +=`



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
// ALL MENU SHOW
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



selectedOrderType = type;



localStorage.setItem(

"orderType",

type

);



showPopular();

showMenu();



};








// =====================================
// CATEGORY FILTER
// =====================================


window.openCategory=function(){



let box =

document.getElementById(

"categoryBox"

);



if(!box)return;



box.style.display="grid";



box.innerHTML="";




let categories =

[

...new Set(

menuData.map(

x=>x.category

)

)

];




categories.forEach(cat=>{



box.innerHTML +=`



<button class="category-btn"

onclick="filterCategory('${cat}')">


${cat}


</button>


`;



});



};









window.filterCategory=function(cat){



let box =

document.getElementById(

"itemBox"

);



if(!box)return;



box.innerHTML="";




menuData

.filter(

x=>x.category===cat

)

.forEach(item=>{



box.innerHTML +=`



<div class="menu-item">


<h3>${item.name}</h3>


<p>

RM ${getPrice(item).toFixed(2)}

</p>



<button onclick="addToCart('${item.id}')">

ADD TO CART

</button>



</div>



`;



});



};









// =====================================
// TOAST SAFE
// =====================================


window.showToast = window.showToast || function(msg){


let t = document.getElementById("toast");


if(t){


t.innerHTML=msg;


t.classList.add("show");


setTimeout(()=>{

t.classList.remove("show");

},2000);



}


};
