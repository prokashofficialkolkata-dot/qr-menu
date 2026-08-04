// =====================================
// RESTORAN HAMEED'S BISTRO
// MENU.JS V3 FINAL
// FIRESTORE + TOP SELLING ITEMS
// =====================================


import {

db

} from "./firebase.js";


import {

collection,
getDocs,
query,
orderBy

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





let allMenuItems = [];

let sellingRank = [];







// =====================================
// LOAD MENU
// =====================================


window.loadMenu = async function(){


try{


const box =
document.getElementById(
"menuContainer"
);



if(!box)return;



box.innerHTML =
"Loading Menu...";





const q =
query(

collection(
db,
"menus"
),

orderBy(
"name"
)

);



const snap =
await getDocs(q);



allMenuItems=[];




snap.forEach((item)=>{


allMenuItems.push({

id:item.id,

...item.data()

});


});




displayMenu(
allMenuItems
);



loadCategory();



}



catch(error){


console.log(
"Menu Load Error",
error
);


}



};









// =====================================
// DISPLAY MENU
// =====================================


window.displayMenu=function(items){



const box =
document.getElementById(
"menuContainer"
);



if(!box)return;



box.innerHTML="";





items.forEach((item)=>{



const div =
document.createElement(
"div"
);



div.className =
"menuItem";





div.innerHTML = `


${item.image ? 

`<img src="${item.image}">`

:

""

}



<h3>
${item.name}
</h3>



<p>
${item.category}
</p>



<p>
RM ${Number(item.price).toFixed(2)}
</p>



<button onclick="addToCart('${item.id}')">

Add

</button>



`;



box.appendChild(div);



});



};









// =====================================
// CATEGORY
// =====================================


window.loadCategory=function(){


const box =
document.getElementById(
"categoryBox"
);



if(!box)return;



box.innerHTML="";





let categories = [

...new Set(

allMenuItems.map(
item=>item.category
)

)

];





categories.forEach((cat)=>{


let btn =
document.createElement(
"button"
);



btn.innerHTML =
cat;



btn.onclick=function(){


filterCategory(cat);


};



box.appendChild(btn);



});



};









// =====================================
// FILTER CATEGORY
// =====================================


window.filterCategory=function(category){



let result =

allMenuItems.filter(

item=>

item.category===category

);



displayMenu(
result
);



};









// =====================================
// TOP 15 SELLING ITEMS
// =====================================


window.showPopularItems = async function(){



try{


let sales={};





const snap =
await getDocs(

collection(
db,
"orders"
)

);





snap.forEach((order)=>{



let data =
order.data();





let items =
data.items || [];





items.forEach((item)=>{



let name =
item.name;



let qty =
Number(item.qty || 1);





if(!sales[name]){

sales[name]=0;

}



sales[name]+=qty;



});



});








let topItems =

Object.entries(sales)

.sort(

(a,b)=>b[1]-a[1]

)

.slice(0,15)

.map(

item=>item[0]

);







let result =

allMenuItems.filter(

menu=>

topItems.includes(
menu.name
)

);





displayMenu(
result
);



}



catch(error){


console.log(
"Popular Error",
error
);



}



};









// =====================================
// SEARCH MENU
// =====================================


window.searchMenu=function(text){



let result =

allMenuItems.filter(

item=>

item.name
.toLowerCase()
.includes(
text.toLowerCase()
)

);



displayMenu(
result
);



};









// =====================================
// RESTORE ALL MENU
// =====================================


window.restoreMenuView=function(){


displayMenu(
allMenuItems
);


};
