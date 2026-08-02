let selectedLanguage = "en";
let selectedType = "";

let menuData = [];
let categories = [];


// Language Select

function setLanguage(lang){

    selectedLanguage = lang;

    alert("Language Selected");

}



// Dine In / Take Away

function openMenu(type){

    selectedType = type;

    document.getElementById("welcome").style.display="none";

    document.getElementById("menuPage").style.display="block";

    loadMenu();

}



// Load CSV Menu

function loadMenu(){


fetch("menu.csv")

.then(response => response.text())

.then(data=>{


let rows=data.split("\n");


rows.shift();



menuData=[];



rows.forEach(row=>{


let column=row.split(",");



if(column.length>=3){


menuData.push({

category:column[0].trim(),

name:column[1].trim(),

price:column[2].trim()


});


}


});



categories=[...new Set(menuData.map(item=>item.category))];


showCategories();


});


}



// Show Category List

function showCategories(){


let box=document.getElementById("categories");


box.innerHTML="";


let title=document.createElement("h3");

title.innerHTML="Select Category";

box.appendChild(title);



categories.forEach(cat=>{


let button=document.createElement("button");


button.innerHTML=cat;


button.className="category";


button.onclick=function(){

showItems(cat);

};



box.appendChild(button);



});


}



// Show Items

function showItems(category){


let box=document.getElementById("items");


box.innerHTML="";



let list=menuData.filter(item=>item.category==category);



list.forEach(item=>{


let div=document.createElement("div");


div.className="item";


div.innerHTML=`

<div>
${item.name}
</div>

<div class="price">
${item.price}
</div>

`;



box.appendChild(div);



});


}
