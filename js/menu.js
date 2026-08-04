// ==========================================
// RESTORAN HAMEED'S BISTRO
// MENU SYSTEM V6 FINAL
// PART 1
// ==========================================



let menuData=[];



let currentLanguage="en";








// ==========================================
// LOAD CSV MENU
// ==========================================


window.loadCSV = async function(){



try{



let response =

await fetch(

"menu.csv"

);






let text =

await response.text();






parseCSV(text);






displayMenu();



displayPopular();






}

catch(error){



console.error(

"CSV Load Error",

error

);



showToast(

"Menu Load Failed"

);



}



};









// ==========================================
// CSV PARSER
// ==========================================


function parseCSV(text){



let rows =

text.trim()

.split("\n");







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






let item={};







headers.forEach((h,index)=>{



item[h]=values[index] || "";



});








item.id = i;







menuData.push(item);




}




}









// ==========================================
// DISPLAY MENU
// ==========================================


function displayMenu(){



let box =

document.getElementById(

"itemBox"

);






if(!box)return;







box.innerHTML="";









menuData.forEach(item=>{





let price =

localStorage.getItem(

"orderType"

)==="TAKE AWAY"

?

item.takeAwayPrice

:

item.dineInPrice;








box.innerHTML += `



<div class="menu-item">



<img

src="images/${item.image || 'food.png'}"

>




<h3>

${item.name}

</h3>





<p>

RM ${Number(price).toFixed(2)}

</p>






<button onclick="addToCart(${item.id})">

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






if(!box)return;






box.innerHTML="";







let popular =

menuData.filter(

item=>

item.popular==="YES"

)

.slice(0,15);







popular.forEach(item=>{



let price =

localStorage.getItem(

"orderType"

)==="TAKE AWAY"

?

item.takeAwayPrice

:

item.dineInPrice;







box.innerHTML += `



<div class="popular-item">


<img

src="images/${item.image || 'food.png'}"

>




<h3>

${item.name}

</h3>



<p>

RM ${Number(price).toFixed(2)}

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



currentLanguage = lang;



localStorage.setItem(

"language",

lang

);






displayMenu();


displayPopular();



};









// ==========================================
// CATEGORY FILTER
// ==========================================


window.filterCategory=function(category){



let box =

document.getElementById(

"itemBox"

);






if(!box)return;






box.innerHTML="";






menuData

.filter(

item=>

item.category===category

)

.forEach(item=>{





let price =

localStorage.getItem(

"orderType"

)==="TAKE AWAY"

?

item.takeAwayPrice

:

item.dineInPrice;







box.innerHTML += `



<div class="menu-item">



<h3>

${item.name}

</h3>




<p>

RM ${Number(price).toFixed(2)}

</p>




<button onclick="addToCart(${item.id})">

ADD

</button>



</div>



`;





});





}









// ==========================================
// START MENU
// ==========================================


window.startMenu=function(type){



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





displayMenu();


displayPopular();



};









// ==========================================
// INITIAL LOAD
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




loadCSV();




});
