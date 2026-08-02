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

let cart = [];


// Language

function setLanguage(lang){

    selectedLanguage = lang;

}



// Start Menu

function startMenu(type){

    selectedType = type;

    document.getElementById("welcome").style.display="none";

    document.getElementById("menuPage").style.display="block";

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



});

}



// Category Open

function openCategory(){


let box=document.getElementById("categoryBox");


box.innerHTML="";


let all=document.createElement("button");

all.innerHTML="ALL CATEGORY";

all.className="category";

all.onclick=function(){

showItems("ALL");

};


box.appendChild(all);



let cats=[...new Set(menuData.map(x=>x.category))];


cats.forEach(cat=>{


let btn=document.createElement("button");

btn.innerHTML=cat;

btn.className="category";


btn.onclick=function(){

showItems(cat);

};


box.appendChild(btn);


});


}



// Show Items

function showItems(category){


document.getElementById("categoryBox").innerHTML="";


let box=document.getElementById("itemBox");


box.innerHTML="";


let items;



if(category=="ALL"){

items=menuData;

}else{

items=menuData.filter(x=>x.category==category);

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


}


alert("Added to Cart");


}



// Show Cart

function showCart(){


document.getElementById("menuPage").style.display="none";

document.getElementById("cartPage").style.display="block";


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


showCart();


}



// Back Menu

function backMenu(){

document.getElementById("cartPage").style.display="none";

document.getElementById("menuPage").style.display="block";

}



// Checkout

function checkout(){


document.getElementById("cartPage").style.display="none";

document.getElementById("checkoutPage").style.display="block";



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

function placeOrder(){


let name=document.getElementById("customerName").value;

let phone=document.getElementById("phone").value;



alert(
"Order Received\n"+
"Customer: "+name+
"\nPhone: "+phone
);



cart=[];


}
