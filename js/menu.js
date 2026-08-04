// =====================================
// RESTORAN HAMEED'S BISTRO
// MENU.JS V2
// PART 1
// =====================================



let menuData = [];




// =====================================
// LOAD CSV MENU
// =====================================

window.loadCSV = async function(){


try{


const response =
await fetch(
"data/menu.csv"
);



const text =
await response.text();



menuData =
parseCSV(text);



displayMenu(menuData);



}

catch(error){


console.log(
"CSV Load Error:",
error
);



showToast(
"Menu Loading Error"
);



}


};





// =====================================
// CSV PARSER
// =====================================

function parseCSV(text){



const rows =
text.trim().split("\n");



const headers =
rows[0]
.split(",");



return rows.slice(1).map(row=>{


const values =
row.split(",");



let obj={};



headers.forEach((h,i)=>{


obj[h.trim()] =
values[i]
?
values[i].trim()
:
"";


});



return obj;



});



}





// =====================================
// DISPLAY MENU
// =====================================

window.displayMenu=function(items){


const box =
document.getElementById(
"menuItems"
);



if(!box)return;



box.innerHTML="";



items.forEach((item)=>{



const div =
document.createElement("div");



div.className =
"menuCard";



div.innerHTML = `

${item.image ? 
`<img src="${item.image}">`
:
""}



<h3>
${item.name}
</h3>


<p>
RM ${Number(item.price).toFixed(2)}
</p>



<button onclick='addToCart(${JSON.stringify(item)})'>

Add To Cart

</button>


`;



box.appendChild(div);



});



};
// =====================================
// CATEGORY FILTER
// =====================================

window.loadCategory=function(){


const box =
document.getElementById(
"categoryBox"
);



if(!box)return;



box.innerHTML="";



const categories =
[...new Set(

menuData.map(

item=>item.category

)

)];



categories.forEach((cat)=>{



const btn =
document.createElement("button");



btn.innerHTML =
cat;



btn.onclick=function(){


const filtered =
menuData.filter(

item=>item.category === cat

);



displayMenu(filtered);



};



box.appendChild(btn);



});



};





// =====================================
// SEARCH MENU
// =====================================

window.searchMenu=function(value){



const keyword =
value.toLowerCase();



const result =
menuData.filter(

item=>

item.name
.toLowerCase()
.includes(keyword)

);



displayMenu(result);



};





// =====================================
// POPULAR ITEMS
// =====================================

window.showPopularItems=function(){



const popular =
menuData.filter(

item=>

item.popular === "yes"

);



displayMenu(popular);



};





// =====================================
// RESTORE MENU
// =====================================

window.restoreMenuView=function(){



displayMenu(menuData);



};
