// =====================================
// RESTORAN HAMEED'S BISTRO
// CUSTOMER QR MENU V4 FINAL
// =====================================


import { db } from "./firebase.js";


import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





let allMenu = [];

let currentPriceType = "dine";







// =====================================
// LOAD ALL MENU
// =====================================


async function loadMenu(){


try{


const snapshot = await getDocs(

collection(
db,
"menus"
)

);




allMenu=[];




snapshot.forEach((doc)=>{


allMenu.push({

id:doc.id,

...doc.data()

});


});





createCategoryButtons();


showPopularItems();


}

catch(error){


console.log(
"Menu Load Error:",
error
);


}



}









// =====================================
// CREATE CATEGORY BUTTON
// =====================================


function createCategoryButtons(){



const box =

document.getElementById(
"categoryList"
);



if(!box)return;



box.innerHTML="";




let categories =

[

...new Set(

allMenu.map(

item=>item.category

)

)

];





categories.forEach((category)=>{


let button =

document.createElement(
"button"
);



button.className =
"categoryBtn";



button.innerHTML =
category;




button.onclick=function(){


openCategory(category);


};




box.appendChild(button);



});



}









// =====================================
// OPEN CATEGORY
// =====================================


window.openCategory=function(category){



let title =

document.getElementById(
"categoryTitle"
);



if(title){

title.innerHTML =
category;

}






let items =

allMenu.filter(

item =>

item.category === category

);






displayItems(items);



};









// =====================================
// DISPLAY MENU ITEMS
// =====================================


function displayItems(items){



const box =

document.getElementById(
"menuItems"
);



if(!box)return;



box.innerHTML="";





if(items.length===0){


box.innerHTML=

"No Items Found";


return;


}







items.forEach((item)=>{



let price;



if(currentPriceType==="dine"){


price =
item.dineInPrice;


}

else{


price =
item.takeAwayPrice;


}







let card =

document.createElement(
"div"
);



card.className =
"menuCard";





card.innerHTML = `


<h3>

${item.name}

</h3>


<p>

RM ${Number(price || 0).toFixed(2)}

</p>



`;





box.appendChild(card);



});




}









// =====================================
// POPULAR TOP 15
// =====================================


async function showPopularItems(){



const box =

document.getElementById(
"popularItems"
);



if(!box)return;




box.innerHTML="";






try{



const salesSnap =

await getDocs(

collection(
db,
"sales"
)

);





let sales=[];



salesSnap.forEach((doc)=>{


sales.push({

id:doc.id,

...doc.data()

});


});






sales.sort(

(a,b)=>

Number(b.qty || 0)

-

Number(a.qty || 0)

);







let top15 =

sales.slice(
0,
15
);







top15.forEach((item)=>{



let card =

document.createElement(
"div"
);



card.className =
"menuCard popular";





let menu =

allMenu.find(

x=>

x.name===item.name

);





let price=0;



if(menu){



price =

currentPriceType==="dine"

?

menu.dineInPrice

:

menu.takeAwayPrice;


}






card.innerHTML = `


<h3>

🔥 ${item.name}

</h3>



<p>

RM ${Number(price).toFixed(2)}

</p>


`;





box.appendChild(card);



});





}

catch(error){



console.log(

"Popular item error",

error

);



}



}









// =====================================
// CHANGE DINE / TAKE AWAY
// =====================================


window.changeMenuType=function(type){



currentPriceType = type;



let currentItems =

document.getElementById(
"menuItems"
);



if(currentItems){



let category =

document.getElementById(
"categoryTitle"
).innerHTML;





let items =

allMenu.filter(

x=>

x.category===category

);





displayItems(items);



}





showPopularItems();



};









// =====================================
// START
// =====================================


window.addEventListener(

"load",

()=>{


loadMenu();


}

);
