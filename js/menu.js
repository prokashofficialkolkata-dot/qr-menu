// ==========================================
// RESTORAN HAMEED'S BISTRO
// MENU SYSTEM V7 OPTIMIZED FINAL
// ==========================================


let menuData = [];

let currentLanguage = "en";

let menuLoaded = false;


// ==========================================
// LOAD CSV MENU
// ==========================================


async function loadCSV(){


if(menuLoaded){

return;

}


try{


let response = await fetch("menu.csv");


let text = await response.text();


parseCSV(text);


menuLoaded = true;



}

catch(error){


console.error(
"Menu CSV Error",
error
);


showToast(
"Menu Loading Failed"
);


}



}







// ==========================================
// CSV PARSER
// ==========================================


function parseCSV(text){



let rows = text
.trim()
.split("\n");



let headers = rows[0]
.split(",")
.map(x=>x.trim());



menuData=[];




for(let i=1;i<rows.length;i++){



let values = rows[i]
.split(",")
.map(x=>x.trim());



if(values.length < 2){

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






let status =
document.getElementById(
"orderTypeDisplay"
);




if(status){

status.innerHTML = type;

}





// QUICK OPEN

setTimeout(async()=>{


await loadCSV();



displayPopular();


displayMenu();



},50);



};









// ==========================================
// DISPLAY MENU
// ==========================================


function displayMenu(){



let box =
document.getElementById(
"itemBox"
);



if(!box){

return;

}



box.innerHTML="";






let type =
localStorage.getItem(
"orderType"
)
||
"DINE IN";







menuData.forEach(item=>{



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

${item.name || ""}

</h3>




<p>

RM ${Number(price || 0).toFixed(2)}

</p>





<button

onclick="addToCart(${item.id})">

ADD

</button>




</div>



`;





});



}









// ==========================================
// POPULAR ITEMS
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
.filter(item=>
item.popular==="YES"
)
.slice(0,15);







popular.forEach(item=>{



let type =
localStorage.getItem(
"orderType"
)
||
"DINE IN";




let price =
type==="TAKE AWAY"

?

item.takeAwayPrice

:

item.dineInPrice;






box.innerHTML += `



<div class="popular-item">



<img loading="lazy"

src="images/${item.image || 'food.png'}"

>




<h3>

${item.name}

</h3>





<p>

RM ${Number(price || 0).toFixed(2)}

</p>




<button

onclick="addToCart(${item.id})">

ADD

</button>




</div>



`;



});



}









// ==========================================
// LANGUAGE
// ==========================================


window.setLanguage=function(lang){



currentLanguage=lang;



localStorage.setItem(
"language",
lang
);



if(menuLoaded){


displayMenu();


displayPopular();


}



};









// ==========================================
// LOAD FIRST TIME
// ==========================================


window.addEventListener(
"load",
()=>{


let lang =
localStorage.getItem(
"language"
);



if(lang){

currentLanguage=lang;

}



});
