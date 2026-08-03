// ==============================
// MENU.JS
// ==============================


window.menuData = [];

window.selectedLanguage = "en";

window.selectedType = "";


// Language
window.setLanguage = function(lang){

    window.selectedLanguage = lang;

};


// Start Menu
window.startMenu = function(type){

    window.selectedType = type;

    if(typeof pageHistory !== "undefined"){
        pageHistory.push("menuPage");
    }

    showPage("menuPage");

    loadCSV();

};



// Load CSV
window.loadCSV = function(){

fetch("menu.csv")

.then(res=>res.text())

.then(data=>{


let rows=data.split("\n");


window.menuData=[];


rows.slice(1).forEach(row=>{


let col=row.split(",");


if(col.length>=4){


menuData.push({

category: col[0].trim(),

name: col[1].trim(),

dine: col[2].trim(),

takeaway: col[3].trim()

});


}


});


showPopularItems();


});


};




// Category
window.openCategory=function(){


let box=document.getElementById("categoryBox");

let itemBox=document.getElementById("itemBox");


document.getElementById("popularSection").style.display="none";


box.innerHTML="";

itemBox.innerHTML="";



let categories=[...new Set(menuData.map(x=>x.category))];



categories.forEach(cat=>{


box.innerHTML+=`

<button class="category"
onclick="showItems('${cat.replace(/'/g,"\\'")}')">

${cat}

</button>


`;


});


};




// Show Items
window.showItems=function(category){


let itemBox=document.getElementById("itemBox");


itemBox.innerHTML="";



let list=menuData.filter(x=>x.category==category);



list.forEach(item=>{


let price=(selectedType=="DINE IN")

? item.dine

: item.takeaway;



itemBox.innerHTML+=`

<div class="item">


<div>

<b>${item.name}</b>

<br>

<span>${price}</span>


</div>



<button

onclick="addCart('${item.name.replace(/'/g,"\\'")}','${price}')">

ADD

</button>



</div>


`;


});


};





// Popular Items

window.showPopularItems=function(){



let section=document.getElementById("popularSection");


if(!section) return;



section.style.display="block";



let box=document.getElementById("popularItems");


if(!box) return;



box.innerHTML="";



if(typeof popularItems=="undefined"){

return;

}



popularItems.forEach(item=>{



box.innerHTML+=`

<div class="popular-card">


<img src="${item.image}">


<b>${item.name}</b>


<p>${item.price}</p>



<button

onclick="addCart('${item.name.replace(/'/g,"\\'")}','${item.price}')">

ADD

</button>



</div>


`;



});


};
