// =====================================
// MENU.JS FINAL
// RESTORAN HAMEED'S BISTRO
// =====================================


let menuData = [];

let currentView = localStorage.getItem("menuView") || "popular";

let selectedCategory = localStorage.getItem("selectedCategory") || "";




// ================================
// LOAD CSV
// ================================

window.loadCSV=function(){


fetch("menu.csv")

.then(response=>response.text())

.then(data=>{


let rows=data.split("\n");


menuData=[];


rows.slice(1).forEach(row=>{


let col=row.split(",");



if(col.length>=4){


menuData.push({

category:col[0].trim(),

name:col[1].trim(),

dine:col[2].trim(),

takeaway:col[3].trim()


});


}



});



// restore previous view


if(currentView==="category" && selectedCategory){


showCategoryItems(selectedCategory);


}

else{


showPopularItems();


}



});

};









// ================================
// CATEGORY LOAD
// ================================

window.loadCategory=function(){


let box=document.getElementById(
"categoryBox"
);


if(!box)return;



box.innerHTML="";



box.style.display="grid";



let categories=[

...new Set(

menuData.map(item=>item.category)

)

];



categories.forEach(function(cat){


let btn=document.createElement("button");


btn.className="category-btn";


btn.innerHTML=cat;



btn.onclick=function(){


selectCategory(cat);


};



box.appendChild(btn);



});


};









// ================================
// SELECT CATEGORY
// ================================

window.selectCategory=function(category){



selectedCategory=category;


currentView="category";



localStorage.setItem(
"menuView",
"category"
);


localStorage.setItem(
"selectedCategory",
category
);



let box=document.getElementById(
"categoryBox"
);


if(box){

box.style.display="none";

}



let popular=document.getElementById(
"popularSection"
);


if(popular){

popular.style.display="none";

}



showCategoryItems(category);



};









// ================================
// CATEGORY ITEMS
// ================================

window.showCategoryItems=function(category){



let itemBox=document.getElementById(
"itemBox"
);



if(!itemBox)return;



itemBox.innerHTML="";



let items=menuData.filter(function(item){


return item.category===category;


});



items.forEach(function(item){


createItemCard(item,itemBox);


});



};









// ================================
// POPULAR
// ================================

window.showPopularItems=function(){



currentView="popular";


localStorage.setItem(
"menuView",
"popular"
);



let itemBox=document.getElementById(
"itemBox"
);


if(itemBox){

itemBox.innerHTML="";

}



let popular=document.getElementById(
"popularSection"
);



if(popular){

popular.style.display="block";

}



let popularBox=document.getElementById(
"popularItems"
);



if(!popularBox)return;



popularBox.innerHTML="";



let popularItems=menuData.slice(0,15);



popularItems.forEach(function(item){


createPopularCard(item,popularBox);


});



};









// ================================
// RESTORE VIEW
// ================================

window.restoreMenuView=function(){



if(currentView==="category" && selectedCategory){


showCategoryItems(selectedCategory);


}

else{


showPopularItems();


}



};









// ================================
// ITEM CARD
// ================================

function createItemCard(item,box){



let div=document.createElement("div");


div.className="menu-item";



let price=

localStorage.getItem("orderType")==="TAKE AWAY"

?

item.takeaway

:

item.dine;




div.innerHTML=`

<h3>${item.name}</h3>

<p>RM ${price}</p>


<button onclick="addToCart('${item.name}','${price}')">

ADD ITEM

</button>


`;



box.appendChild(div);



}









// ================================
// POPULAR CARD
// ================================

function createPopularCard(item,box){



let div=document.createElement("div");


div.className="popular-card";



div.innerHTML=`

<h3>⭐ ${item.name}</h3>

<p>RM ${item.dine}</p>


<button onclick="addToCart('${item.name}','${item.dine}')">

ADD ITEM

</button>


`;



box.appendChild(div);



}









// ================================
// ADD CART
// ================================

window.addToCart=function(name,price){



let cart=

JSON.parse(
localStorage.getItem("cart")
)

|| [];



cart.push({

name:name,

price:price

});



localStorage.setItem(

"cart",

JSON.stringify(cart)

);



if(typeof updateCartCount==="function"){


updateCartCount();


}



showToast(

"Hameed's Bistro says "+name+" Added"

);



};









// ================================
// AUTO LOAD
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){


if(document.getElementById("menuPage")){


loadCSV();


}



});
