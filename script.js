// Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import { 
getFirestore,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



const firebaseConfig = {

apiKey: "AIzaSyA-bY4_1pk5QX6dTQPyy2uruB0qBb0c6s0",

authDomain: "hameed-bistro-qr-menu.firebaseapp.com",

projectId: "hameed-bistro-qr-menu",

storageBucket: "hameed-bistro-qr-menu.firebasestorage.app",

messagingSenderId: "860085792035",

appId: "1:860085792035:web:9907610b51cd7b73147096"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

let menuData = [];

let selectedType = "";

let selectedLanguage = "en";


let cart = JSON.parse(localStorage.getItem("cart")) || [];


let popularItems = [
{
name:"Chicken Tandoori",
image:"images/chicken-tandoori.jpg",
price:"RM 12.00"
},
{
name:"Nasi Lemak Ayam Goreng",
image:"images/nasi-lemak.jpg",
price:"RM 10.00"
},
{
name:"Naan Cheese Mozzarella",
image:"images/naan-cheese.jpg",
price:"RM 15.00"
}
];

// Page Navigation

let pageHistory = ["welcome"];

function showPage(pageId){

    document.querySelectorAll("#welcome, #menuPage, #cartPage, #checkoutPage")
    .forEach(page=>{
        page.style.display="none";
    });


    document.getElementById(pageId).style.display="block";


    let back = document.getElementById("backBtn");
    let home = document.getElementById("homeBtn");


    if(back && home){

        if(pageId !== "welcome"){

            back.style.display="inline-block";
            home.style.display="inline-block";

        }else{

            back.style.display="none";
            home.style.display="none";

        }

    }

}

function goBack(){

    if(pageHistory.length > 1){

        pageHistory.pop();

        let previousPage = pageHistory[pageHistory.length-1];

        showPage(previousPage);

    }

}



function goHome(){

    pageHistory=["welcome"];

    showPage("welcome");

}



function refreshPage(){

    location.reload();

}

// Language

function setLanguage(lang){

    selectedLanguage = lang;

}


//Popular items 
function showPopularItems(){

let box=document.getElementById("popularItems");

box.innerHTML="";


popularItems.forEach(item=>{

box.innerHTML+=`

<div class="popular-card">

<img src="${item.image}">

<b>${item.name}</b>

<p>${item.price}</p>

<button onclick="addCart('${item.name}','${item.price}')">
ADD
</button>

</div>

`;

});

}

// Start Menu

function startMenu(type){

selectedType = type;

pageHistory.push("menuPage");

showPage("menuPage");

document.getElementById("categoryBox").innerHTML="";
document.getElementById("itemBox").innerHTML="";

loadCSV();

}


// Load CSV

function loadCSV(){

fetch("menu.csv")

.then(res=>res.text())

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


showPopularItems();

});

}


// Category Open

function openCategory(){

let box = document.getElementById("categoryBox");

let popular = document.getElementById("popularSection");

let itemBox = document.getElementById("itemBox");


// যদি Category আগে থেকেই খোলা থাকে
// তাহলে বন্ধ করবে এবং Popular দেখাবে

if(box.innerHTML !== ""){


box.innerHTML = "";


// আগের Category item মুছে দেবে

itemBox.innerHTML = "";
// Category Open

function openCategory(){

let box = document.getElementById("categoryBox");

let popular = document.getElementById("popularSection");

let itemBox = document.getElementById("itemBox");



// যদি Category আগে থেকেই খোলা থাকে
// তাহলে বন্ধ করবে

if(box.innerHTML !== ""){


box.innerHTML = "";


// আগের Category item মুছে দেবে

itemBox.innerHTML = "";


// Popular আবার দেখাবে

if(popular){

popular.style.display = "block";

}


return;

}



// Category খোলার সময়
// Popular এবং Item লুকাবে

if(popular){

popular.style.display = "none";

}


itemBox.innerHTML = "";

box.innerHTML = "";




// ALL CATEGORY Button

let all = document.createElement("button");

all.innerHTML = "ALL CATEGORY";

all.className = "category";


all.onclick = function(){

showItems("ALL");

};


box.appendChild(all);





// Category List তৈরি

let cats = [...new Set(menuData.map(x=>x.category))];


cats.forEach(cat=>{


let btn = document.createElement("button");


btn.innerHTML = cat;

btn.className = "category";



btn.onclick = function(){

showItems(cat);

};



box.appendChild(btn);


});


}



// Show Items

function showItems(category){

document.getElementById("popularItems").style.display="none";

// Mobile-এ Category List বন্ধ হবে
document.getElementById("categoryBox").innerHTML="";
document.activeElement.blur();

let box=document.getElementById("itemBox");

box.innerHTML="";


let items;

// Show Items

function showItems(category){


// Popular Items পুরো লুকাবে

let popularSection = document.getElementById("popularSection");

if(popularSection){

popularSection.style.display = "none";

}


// Category list বন্ধ হবে

document.getElementById("categoryBox").innerHTML="";


// Item Box পরিষ্কার করবে

let box=document.getElementById("itemBox");

box.innerHTML="";



let items;



if(category=="ALL"){

items = menuData;

}else{

items = menuData.filter(x=>x.category==category);

}




items.forEach(item=>{


let price;


if(selectedType=="DINE IN"){

price=item.dine;

}else{

price=item.takeaway;

}




let div=document.createElement("div");


div.className="item";


div.innerHTML=`

<div>
<b>${item.name}</b><br>
${price}
</div>


<button class="add-btn"
onclick="addCart('${item.name}','${price}')">
ADD
</button>

`;



box.appendChild(div);


});


}



// Add Cart

function addCart(name,price){


let found=cart.find(x=>x.name==name);



if(found){

found.qty++;

}else{


cart.push({

name:name,

price:price,

qty:1

});
localStorage.setItem("cart", JSON.stringify(cart));

}


alert("Added to Cart");


}



// Show Cart

function showCart(){

if(pageHistory[pageHistory.length-1] !== "cartPage"){
    pageHistory.push("cartPage");
}

showPage("cartPage");

let box=document.getElementById("cartItems");


box.innerHTML="";


let total=0;



cart.forEach((item,index)=>{


let amount=parseFloat(
item.price.replace("RM","")
)*item.qty;


total+=amount;



box.innerHTML+=`

<div class="cart-item">

${item.name}

<br>

RM ${amount.toFixed(2)}

<br>

<button onclick="changeQty(${index},-1)">-</button>

${item.qty}

<button onclick="changeQty(${index},1)">+</button>


</div>

`;


});


document.getElementById("total").innerHTML=
"Total: RM "+total.toFixed(2);



}



// Quantity

function changeQty(index,value){


cart[index].qty+=value;


if(cart[index].qty<=0){

cart.splice(index,1);

}

localStorage.setItem("cart", JSON.stringify(cart));


showCart();


}



// Back Menu

function backMenu(){

goBack();

}



// Checkout

function checkout(){

    pageHistory.push("checkoutPage");

    showPage("checkoutPage");


    let box=document.getElementById("tableInput");


    if(selectedType=="DINE IN"){

        box.innerHTML=`
        <input id="tableNumber" placeholder="Table Number">
        `;

    }else{

        box.innerHTML="Table: TAKE AWAY";

    }

}


// Place Order

async function placeOrder(){


let customerName=document.getElementById("customerName").value;

let phone=document.getElementById("phone").value;


let table="TAKE AWAY";


if(selectedType=="DINE IN"){

table=document.getElementById("tableNumber").value;

}



await addDoc(collection(db,"orders"),{


type:selectedType,

tableNumber: table,

customerName:customerName,

phone:phone,

items:cart,

time:new Date(),

status:"NEW"


});



alert("Order Sent Successfully");


cart=[];

localStorage.removeItem("cart");


}


window.setLanguage = setLanguage;
window.startMenu = startMenu;
window.openCategory = openCategory;
window.showItems = showItems;
window.addCart = addCart;
window.showCart = showCart;
window.checkout = checkout;
window.backMenu = backMenu;
window.placeOrder = placeOrder;
window.changeQty = changeQty;
window.goBack = goBack;
window.goHome = goHome;
window.refreshPage = refreshPage;
    
