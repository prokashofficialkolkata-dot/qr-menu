
// ==========================================
// RESTORAN HAMEED'S BISTRO
// MENU SYSTEM V8 ULTRA FAST
// ==========================================


let menuData = [];

let menuLoaded = false;

let currentIndex = 0;

const ITEMS_PER_LOAD = 20;






// ==========================================
// LOAD CSV
// ==========================================


async function loadCSV(){


if(menuLoaded){

return;

}



try{


let response = await fetch(
"menu.csv"
);



let text = await response.text();



parseCSV(text);



menuLoaded=true;



}

catch(error){


console.error(
"CSV Error",
error
);


}



}









// ==========================================
// CSV PARSER
// ==========================================


function parseCSV(text){


let rows =
text.trim().split("\n");



let headers =
rows[0]
.split(",")
.map(x=>x.trim());



menuData=[];



for(let i=1;i<rows.length;i++){


let values =
rows[i]
.split(",")
.map(x=>x.trim());



if(values.length<2){

continue;

}



let item={};



headers.forEach((h,index)=>{


item[h]=values[index] || "";


});



item.id=i;



menuData.push(item);



}



}









// ==========================================
// START MENU
// ==========================================


window.startMenu = async function(type){



localStorage.setItem(
"orderType",
type
);




document.getElementById(
"welcome"
).style.display="none";




document.getElementById(
"menuPage"
).style.display="block";






let display =
document.getElementById(
"orderTypeDisplay"
);



if(display){

display.innerHTML=type;

}





await loadCSV();





currentIndex=0;


document.getElementById(
"itemBox"
).innerHTML="";



loadMoreMenu();



displayPopular();



};









// ==========================================
// LOAD MORE MENU
// ==========================================


window.loadMoreMenu=function(){



let box =
document.getElementById(
"itemBox"
);



if(!box){

return;

}





let type =
localStorage.getItem(
"orderType"
)
||
"DINE IN";





let next =
currentIndex + ITEMS_PER_LOAD;



let items =
menuData.slice(
currentIndex,
next
);






items.forEach(item=>{



let price =
type==="TAKE AWAY"

?

item.takeAwayPrice

:

item.dineInPrice;






box.innerHTML += `



<div class="menu-item">



<img loading="lazy"

src="images/${item.image || 'food.png'}"

>



<h3>

${item.name}

</h3>



<p>

RM ${Number(price||0).toFixed(2)}

</p>



<button onclick="addToCart(${item.id})">

ADD

</button>



</div>



`;



});






currentIndex=next;






let btn =
document.getElementById(
"loadMoreBtn"
);



if(btn){



if(currentIndex>=menuData.length){



btn.style.display="none";


}

else{


btn.style.display="block";


}



}



};









// ==========================================
// POPULAR ITEM
// ==========================================


function displayPopular(){



let box =
document.getElementById(
"popularItems"
);



if(!box){

return;

}



box.innerHTML="";




let popular =
menuData
.filter(
item=>item.popular==="YES"
)
.slice(0,10);






popular.forEach(item=>{



box.innerHTML += `



<div class="popular-item">



<img loading="lazy"

src="images/${item.image || 'food.png'}"

>



<h3>

${item.name}

</h3>



<button onclick="addToCart(${item.id})">

ADD

</button>



</div>



`;



});



}









// ==========================================
// CATEGORY FILTER
// ==========================================


window.filterCategory=function(category){



let box =
document.getElementById(
"itemBox"
);



box.innerHTML="";




let filter =
menuData.filter(
item=>item.category===category
);





currentIndex=0;



menuData =
filter;



loadMoreMenu();



};









// ==========================================
// INITIAL
// ==========================================


window.addEventListener(
"load",
()=>{


loadCSV();



});
