
// =====================================
// MENU.JS FINAL V5
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

window.menuData = menuData;






let selectedOrderType =

localStorage.getItem("orderType")

||

"DINE IN";








// =====================================
// LOAD MENU
// =====================================


window.loadMenu = async function(){



try{



const snap = await getDocs(

collection(db,"menus")

);




menuData.length = 0;





snap.forEach(doc=>{


let d = doc.data();



menuData.push({


id:doc.id,


category:

d.category || "",



name:

d["Item Name"]

||

d.itemName

||

"",




dineInPrice:

Number(

d["Dine in price"]

||

d.dineInPrice

||

0

),




takeAwayPrice:

Number(

d["Take away Price"]

||

d.takeAwayPrice

||

0

),




sold:

Number(

d.sold

||

0

)



});



});






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

"Menu Load Failed"

);



}



};









// =====================================
// PRICE
// =====================================


function getPrice(item){



if(selectedOrderType==="TAKE AWAY"){


return item.takeAwayPrice;


}


return item.dineInPrice;


}









// =====================================
// POPULAR ITEMS
// =====================================


function showPopular(){



let box=document.getElementById(

"popularItems"

);



if(!box)return;




box.innerHTML="";




let popular=[...menuData]

.sort(

(a,b)=>b.sold-a.sold

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



let box=document.getElementById(

"itemBox"

);



if(!box)return;





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
// ORDER TYPE CHANGE
// =====================================


window.changeOrderType=function(type){



selectedOrderType=type;



localStorage.setItem(

"orderType",

type

);



showPopular();


showMenu();




let display=document.getElementById(

"orderTypeDisplay"

);



if(display){


display.innerHTML=type;


}




};









// =====================================
// CATEGORY
// =====================================


window.openCategory=function(){



let box=document.getElementById(

"categoryBox"

);



if(!box)return;




box.style.display="grid";



box.innerHTML="";




let cats=[

...new Set(

menuData.map(x=>x.category)

)

];






cats.forEach(cat=>{



box.innerHTML +=`



<button

class="category-btn"

onclick="filterCategory('${cat}')">


${cat}


</button>



`;



});



};









window.filterCategory=function(cat){



let box=document.getElementById(

"itemBox"

);



if(!box)return;




box.innerHTML="";





menuData

.filter(x=>x.category===cat)

.forEach(item=>{



box.innerHTML +=`



<div class="menu-item">


<h3>

${item.name}

</h3>


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









// AUTO LOAD READY


window.addEventListener(

"load",

()=>{


if(document.getElementById("menuPage")){


// wait for click DINE IN


}



}

);
