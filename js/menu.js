// ==============================
// MENU.JS
// ==============================

window.menuData = [];

window.selectedType = "";


// ==============================
// START MENU
// ==============================

window.startMenu = function(type){

    window.selectedType = type;

    if(typeof pageHistory !== "undefined"){
        pageHistory.push("menuPage");
    }

    showPage("menuPage");

    loadCSV();

};




// ==============================
// LOAD CSV MENU
// ==============================


window.loadCSV = function(){


fetch("menu.csv")


.then(response=>response.text())


.then(data=>{


let rows = data.split("\n");


window.menuData=[];



rows.slice(1).forEach(row=>{


let col=row.split(",");



if(col.length >= 4){


menuData.push({

category:col[0].trim(),

name:col[1].trim(),

dine:col[2].trim(),

takeaway:col[3].trim()


});


}



});



showPopularItems();



});



};






// ==============================
// OPEN CATEGORY
// ==============================


window.openCategory=function(){


let categoryBox =
document.getElementById("categoryBox");


let itemBox =
document.getElementById("itemBox");



document.getElementById("popularSection").style.display="none";



categoryBox.innerHTML="";

itemBox.innerHTML="";



let categories=[...new Set(
menuData.map(item=>item.category)
)];



categories.forEach(category=>{


categoryBox.innerHTML += `


<button onclick="showItems('${category}')">

${category}

</button>


`;



});



};







// ==============================
// SHOW ITEMS
// ==============================


window.showItems=function(category){


let itemBox =
document.getElementById("itemBox");



itemBox.innerHTML="";



let items =
menuData.filter(
item=>item.category==category
);



items.forEach(item=>{


let price =
(selectedType=="DINE IN")
?
item.dine
:
item.takeaway;



itemBox.innerHTML += `


<div class="item">


<div>


<b>${item.name}</b>


<br>


<span>${price}</span>


</div>



<button onclick="addCart('${item.name}','${price}')">

ADD

</button>



</div>


`;



});



};






// ==============================
// POPULAR ITEMS
// ==============================


window.showPopularItems=function(){


let box =
document.getElementById("popularItems");



if(!box)return;



box.innerHTML="";



// এখন temporary first 15 item দেখাবে

let popular =
menuData.slice(0,15);



popular.forEach(item=>{


box.innerHTML += `


<div class="popular-card">


<img src="images/${item.name}.jpg">


<b>${item.name}</b>


<p>

${selectedType=="DINE IN"
?
item.dine
:
item.takeaway}

</p>



<button onclick="addCart('${item.name}','${item.dine}')">

ADD

</button>



</div>


`;



});



};
