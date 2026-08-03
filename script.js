// ==============================
// FIREBASE IMPORT
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
doc,
setDoc,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import{
getAuth,
GoogleAuthProvider,
signInWithPopup,
signInWithRedirect,
getRedirectResult,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}from"https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";



// ==============================
// FIREBASE CONFIG
// ==============================

const firebaseConfig={

apiKey:"AIzaSyA-bY4_1pk5QX6dTQPyy2uruB0qBb0c6s0",

authDomain:"hameed-bistro-qr-menu.firebaseapp.com",

projectId:"hameed-bistro-qr-menu",

storageBucket:"hameed-bistro-qr-menu.firebasestorage.app",

messagingSenderId:"860085792035",

appId:"1:860085792035:web:9907610b51cd7b73147096"

};

const app=initializeApp(firebaseConfig);

const db=getFirestore(app);

const auth=getAuth(app);



// ==============================
// GLOBAL VARIABLES
// ==============================

let selectedLanguage="en";

let selectedType="";

let menuData=[];

let pageHistory=["welcome"];

let cart=JSON.parse(localStorage.getItem("cart"))||[];



// ==============================
// POPULAR ITEMS
// ==============================

const popularItems=[

{

name:"Chicken Tandoori",

price:"RM 12.00",

image:"images/chicken-tandoori.jpg"

},

{

name:"Nasi Lemak Ayam Goreng",

price:"RM 10.00",

image:"images/nasi-lemak.jpg"

},

{

name:"Naan Cheese Mozzarella",

price:"RM 15.00",

image:"images/naan-cheese.jpg"

}

];



// ==============================
// SHOW PAGE
// ==============================

function showPage(id){

document.querySelectorAll(

"#welcome,#menuPage,#cartPage,#checkoutPage"

).forEach(p=>{

p.style.display="none";

});

document.getElementById(id).style.display="block";

}



// ==============================
// HOME
// ==============================

function goHome(){

pageHistory=["welcome"];

showPage("welcome");

}



// ==============================
// BACK
// ==============================

function goBack(){

if(pageHistory.length>1){

pageHistory.pop();

showPage(pageHistory[pageHistory.length-1]);

}

}



// ==============================
// REFRESH
// ==============================

function refreshPage(){

location.reload();

}



// ==============================
// LANGUAGE
// ==============================

function setLanguage(lang){

selectedLanguage=lang;

}



// ==============================
// START MENU
// ==============================

function startMenu(type){

selectedType=type;

pageHistory.push("menuPage");

showPage("menuPage");

loadCSV();

}



// ==============================
// LOAD CSV
// ==============================

function loadCSV(){

fetch("menu.csv")

.then(r=>r.text())

.then(data=>{

menuData=[];

let rows=data.split("\n");

rows.slice(1).forEach(row=>{

let c=row.split(",");

if(c.length>=4){

menuData.push({

category:c[0].trim(),

name:c[1].trim(),

dine:c[2].trim(),

takeaway:c[3].trim()

});

}

});

showPopularItems();

});

}
// ==============================
// POPULAR ITEMS
// ==============================

function showPopularItems(){

let section=document.getElementById("popularSection");
let box=document.getElementById("popularItems");

if(!section || !box) return;

section.style.display="block";

box.innerHTML="";

popularItems.forEach(item=>{

box.innerHTML+=`

<div class="popular-card">

<img src="${item.image}" alt="${item.name}">

<b>${item.name}</b>

<p>${item.price}</p>

<button onclick="addCart('${item.name}','${item.price}')">

ADD

</button>

</div>

`;

});

}



// ==============================
// CATEGORY
// ==============================

function openCategory(){

let categoryBox=document.getElementById("categoryBox");
let itemBox=document.getElementById("itemBox");

document.getElementById("popularSection").style.display="none";

categoryBox.innerHTML="";
itemBox.innerHTML="";

let all=document.createElement("button");

all.className="category";

all.innerHTML="ALL CATEGORY";

all.onclick=()=>showItems("ALL");

categoryBox.appendChild(all);

let categories=[...new Set(menuData.map(x=>x.category))];

categories.forEach(cat=>{

let btn=document.createElement("button");

btn.className="category";

btn.innerHTML=cat;

btn.onclick=()=>showItems(cat);

categoryBox.appendChild(btn);

});

}



// ==============================
// SHOW ITEMS
// ==============================

function showItems(category){

let itemBox=document.getElementById("itemBox");

itemBox.innerHTML="";

let items=(category=="ALL")

?menuData

:menuData.filter(x=>x.category==category);

items.forEach(item=>{

let price=

selectedType=="DINE IN"

?item.dine

:item.takeaway;

itemBox.innerHTML+=`

<div class="item">

<div>

<b>${item.name}</b>

<br>

${price}

</div>

<button

class="add-btn"

onclick="addCart('${item.name}','${price}')">

ADD

</button>

</div>

`;

});

}



// ==============================
// ADD CART
// ==============================

function addCart(name,price){

let found=cart.find(x=>x.name==name);

if(found){

found.qty++;

}else{

cart.push({

name,

price,

qty:1

});

}

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

alert("Added To Cart");

}



// ==============================
// CART
// ==============================

function showCart(){

pageHistory.push("cartPage");

showPage("cartPage");

let box=document.getElementById("cartItems");

box.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

let amount=

parseFloat(item.price.replace("RM",""))*

item.qty;

total+=amount;

box.innerHTML+=`

<div class="cart-item">

<b>${item.name}</b>

<br>

RM ${amount.toFixed(2)}

<br><br>

<button onclick="changeQty(${index},-1)">-</button>

${item.qty}

<button onclick="changeQty(${index},1)">+</button>

</div>

`;

});

document.getElementById("total").innerHTML=

"Total : RM "+total.toFixed(2);

}



// ==============================
// CHANGE QTY
// ==============================

function changeQty(index,value){

cart[index].qty+=value;

if(cart[index].qty<=0){

cart.splice(index,1);

}

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

showCart();

}



// ==============================
// CHECKOUT
// ==============================

function checkout(){

pageHistory.push("checkoutPage");

showPage("checkoutPage");

// Login First

document.getElementById("loginBox").style.display="block";

document.getElementById("createBox").style.display="none";

document.getElementById("phoneBox").style.display="none";

// Hide Checkout Form

document.getElementById("tableInput").style.display="none";

document.getElementById("customerName").style.display="none";

document.getElementById("phone").style.display="none";

}
// ==============================
// CREATE ACCOUNT
// ==============================

async function createAccount(){

let name=document.getElementById("createName").value.trim();
let phone=document.getElementById("createPhone").value.trim();
let email=document.getElementById("createEmail").value.trim();
let password=document.getElementById("createPassword").value;
let confirm=document.getElementById("confirmPassword").value;

if(name==""||phone==""||email==""||password==""){

alert("Please fill all fields");
return;

}

if(password!==confirm){

alert("Password not match");
return;

}

try{

let result=await createUserWithEmailAndPassword(auth,email,password);

await setDoc(doc(db,"customers",result.user.uid),{

uid:result.user.uid,
name:name,
phone:phone,
email:email,
loginType:"Email"

});

alert("Account Created Successfully");

showLogin();

}catch(e){

alert(e.message);

}

}



// ==============================
// LOGIN
// ==============================

async function loginUser(){

let email=document.getElementById("loginEmail").value.trim();
let password=document.getElementById("loginPassword").value;

try{

let result=await signInWithEmailAndPassword(auth,email,password);

let uid=result.user.uid;

let q=query(collection(db,"customers"),where("uid","==",uid));

let snap=await getDocs(q);

snap.forEach(docu=>{

let d=docu.data();

localStorage.setItem("customerName",d.name);
localStorage.setItem("customerPhone",d.phone);
localStorage.setItem("customerEmail",d.email);

});

openCheckoutForm();

}catch(e){

alert(e.message);

}

}



// ==============================
// GOOGLE LOGIN
// ==============================

async function googleLogin(){

let provider=new GoogleAuthProvider();

if(/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)){

await signInWithRedirect(auth,provider);

return;

}

let result=await signInWithPopup(auth,provider);

afterGoogleLogin(result.user);

}



getRedirectResult(auth).then(result=>{

if(result){

afterGoogleLogin(result.user);

}

});



function afterGoogleLogin(user){

localStorage.setItem("customerName",user.displayName||"");
localStorage.setItem("customerEmail",user.email||"");

document.getElementById("loginBox").style.display="none";
document.getElementById("phoneBox").style.display="block";

}



// ==============================
// SAVE PHONE
// ==============================

async function saveGooglePhone(){

let phone=document.getElementById("googlePhone").value.trim();

if(phone==""){

alert("Phone Number Required");

return;

}

let user=auth.currentUser;

await setDoc(doc(db,"customers",user.uid),{

uid:user.uid,
name:user.displayName,
email:user.email,
phone:phone,
loginType:"Google"

});

localStorage.setItem("customerName",user.displayName);
localStorage.setItem("customerPhone",phone);
localStorage.setItem("customerEmail",user.email);

openCheckoutForm();

}



// ==============================
// OPEN CHECKOUT
// ==============================

function openCheckoutForm(){

document.getElementById("loginBox").style.display="none";
document.getElementById("phoneBox").style.display="none";

document.getElementById("tableInput").style.display="block";
document.getElementById("customerName").style.display="block";
document.getElementById("phone").style.display="block";

document.getElementById("customerName").value=localStorage.getItem("customerName");
document.getElementById("phone").value=localStorage.getItem("customerPhone");

document.getElementById("customerName").readOnly=true;
document.getElementById("phone").readOnly=true;

if(selectedType=="DINE IN"){

document.getElementById("tableInput").innerHTML=`
<input id="tableNumber" placeholder="Table Number" required>
`;

}else{

document.getElementById("tableInput").innerHTML="<b>TAKE AWAY</b>";

}

}



// ==============================
// PLACE ORDER
// ==============================

async function placeOrder(){

let customerName=document.getElementById("customerName").value.trim();
let phone=document.getElementById("phone").value.trim();

let table="TAKE AWAY";

if(selectedType=="DINE IN"){

let tableInput=document.getElementById("tableNumber");

if(tableInput.value.trim()==""){

alert("Table Number Required");

return;

}

table=tableInput.value.trim();

}

await addDoc(collection(db,"orders"),{

customerName,
phone,
tableNumber:table,
type:selectedType,
items:cart,
status:"NEW",
time:new Date()

});

alert("Order Successful");

cart=[];

localStorage.removeItem("cart");

goHome();

}



// ==============================
// LOGIN PAGE SWITCH
// ==============================

function showCreateAccount(){

document.getElementById("loginBox").style.display="none";
document.getElementById("createBox").style.display="block";

}

function showLogin(){

document.getElementById("createBox").style.display="none";
document.getElementById("loginBox").style.display="block";

}



// ==============================
// EXPORT
// ==============================

window.setLanguage=setLanguage;
window.startMenu=startMenu;
window.openCategory=openCategory;
window.showItems=showItems;
window.addCart=addCart;
window.showCart=showCart;
window.changeQty=changeQty;
window.checkout=checkout;
window.placeOrder=placeOrder;
window.goHome=goHome;
window.goBack=goBack;
window.refreshPage=refreshPage;
window.loginUser=loginUser;
window.createAccount=createAccount;
window.googleLogin=googleLogin;
window.saveGooglePhone=saveGooglePhone;
window.showCreateAccount=showCreateAccount;
window.showLogin=showLogin;
