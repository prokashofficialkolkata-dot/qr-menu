// ==============================
// MENU.JS
// ==============================


window.menuData = [];

window.selectedType = "";




// Load CSV

window.loadCSV = function(){


fetch("menu.csv")


.then(response=>response.text())


.then(data=>{


let rows = data.split("\n");


menuData=[];



rows.slice(1).forEach(row=>{


let col = row.split(",");



if(col.length >= 4){


menuData.push({

category: col[0].trim(),

name: col[1].trim(),

dine: col[2].trim(),

takeaway: col[3].trim()


});


}


});



showPopularItems();


openCategory();



});


};







// Category List

window.openCategory=function(){


let box=document.getElementById("categoryBox");


let itemBox=document.getElementById("itemBox");


if(!box) return;



box.innerHTML="";


itemBox.innerHTML="";



let categories=[...new Set(

menuData.map(item=>item.category)

)];




categories.forEach(category=>{


box.innerHTML += `


<button onclick="showItems('${category}')">


${category}


</button>


`;


});



};







// Show Items

window.showItems=function(category){



let box=document.getElementById("itemBox");


box.innerHTML="";



let list = menuData.filter(

item=>item.category==category

);




list.forEach(item=>{



let price;



if(selectedType=="DINE IN"){

price=item.dine;

}

else{

price=item.takeaway;

}




box.innerHTML += `


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







// Popular Items

window.showPopularItems=function(){


let section=document.getElementById("popularSection");


if(section){

section.style.display="none";

}


};
