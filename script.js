// Firebase

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";



// Firebase Config

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
const auth = getAuth(app);


// Global Variables

let menuData = [];

let selectedType = "";

let selectedLanguage = "en";


let cart = JSON.parse(localStorage.getItem("cart")) || [];



// Popular Items

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




// Page History

let pageHistory = ["welcome"];




// Show Page

function showPage(pageId){

document.querySelectorAll(
"#welcome, #menuPage, #cartPage, #checkoutPage"
)
.forEach(page=>{

page.style.display="none";

});


let page=document.getElementById(pageId);


if(page){

page.style.display="block";

}



let back=document.getElementById("backBtn");

let home=document.getElementById("homeBtn");


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




// Back

function goBack(){


if(pageHistory.length > 1){


pageHistory.pop();


let previous =
pageHistory[pageHistory.length-1];


showPage(previous);


}


}




// Home

function goHome(){

pageHistory=["welcome"];

showPage("welcome");

}




// Refresh

function refreshPage(){

location.reload();

}




// Language

function setLanguage(lang){

selectedLanguage = lang;

}




// Show Popular Items

function showPopularItems(){


let section =
document.getElementById("popularSection");


let box =
document.getElementById("popularItems");



if(!section || !box){

return;

}



section.style.display="block";


box.innerHTML="";



popularItems.forEach(item=>{


box.innerHTML += `


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



let popular =
document.getElementById("popularSection");


if(popular){

popular.style.display="block";

}



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




// Open Category

function openCategory(){


let categoryBox =
document.getElementById("categoryBox");


let itemBox =
document.getElementById("itemBox");


let popular =
document.getElementById("popularSection");




// যদি Category খোলা থাকে
// তাহলে বন্ধ করবে

if(categoryBox.innerHTML !== ""){


categoryBox.innerHTML="";


itemBox.innerHTML="";



// Popular আবার দেখাবে

if(popular){

popular.style.display="block";

showPopularItems();

}



return;


}





// Category খুললে

categoryBox.innerHTML="";

itemBox.innerHTML="";



// Popular hide

if(popular){

popular.style.display="none";

}




// All Category Button


let all =
document.createElement("button");


all.className="category";


all.innerHTML="ALL CATEGORY";



all.onclick=function(){

showItems("ALL");

};



categoryBox.appendChild(all);




// Create Category List


let categories =
[...new Set(menuData.map(x=>x.category))];



categories.forEach(cat=>{


let btn =
document.createElement("button");


btn.className="category";


btn.innerHTML=cat;



btn.onclick=function(){


showItems(cat);


};



categoryBox.appendChild(btn);



});



}




// Show Items

function showItems(category){


let categoryBox =
document.getElementById("categoryBox");


let itemBox =
document.getElementById("itemBox");


let popular =
document.getElementById("popularSection");




// Popular hide

if(popular){

popular.style.display="none";

}




// Category list close

categoryBox.innerHTML="";



// Clear old items

itemBox.innerHTML="";




let items;



if(category=="ALL"){


items=menuData;


}else{


items =
menuData.filter(
x=>x.category==category
);


}





items.forEach(item=>{


let price;



if(selectedType=="DINE IN"){


price=item.dine;


}else{


price=item.takeaway;


}





let div =
document.createElement("div");



div.className="item";



div.innerHTML=`


<div>

<b>${item.name}</b>

<br>

${price}


</div>



<button class="add-btn"

onclick="addCart('${item.name}','${price}')">

ADD

</button>



`;



itemBox.appendChild(div);



});



}

// Add Cart

function addCart(name,price){


let found =
cart.find(x=>x.name==name);



if(found){


found.qty++;


}else{


cart.push({

name:name,

price:price,

qty:1

});


}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("Added to Cart");


}





// Show Cart

function showCart(){


if(pageHistory[pageHistory.length-1] !== "cartPage"){


pageHistory.push("cartPage");


}



showPage("cartPage");



let box =
document.getElementById("cartItems");



box.innerHTML="";



let total=0;



cart.forEach((item,index)=>{



let amount =
parseFloat(
item.price.replace("RM","")
)
*
item.qty;



total += amount;



box.innerHTML += `


<div class="cart-item">


<b>${item.name}</b>


<br>


RM ${amount.toFixed(2)}


<br>



<button onclick="changeQty(${index},-1)">
-
</button>



${item.qty}



<button onclick="changeQty(${index},1)">
+
</button>



</div>



`;



});




document.getElementById("total").innerHTML =

"Total: RM " + total.toFixed(2);



}




// Change Quantity

function changeQty(index,value){


cart[index].qty += value;



if(cart[index].qty<=0){


cart.splice(index,1);


}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



showCart();



}






// Checkout Function

function checkout(){

    // Login Page হিসেবে checkoutPage ব্যবহার করবো

    pageHistory.push("checkoutPage");

    showPage("checkoutPage");


    // Checkout form hide

    document.getElementById("tableInput").style.display="none";

    document.getElementById("customerName").style.display="none";

    document.getElementById("phone").style.display="none";


    // Login show

    document.getElementById("loginBox").style.display="block";

    document.getElementById("createBox").style.display="none";

    document.getElementById("phoneBox").style.display="none";

}

//login succes 
function loginSuccess(userData){

    document.getElementById("loginBox").style.display="none";


    // Checkout fields show

    document.getElementById("tableInput").style.display="block";

    document.getElementById("customerName").style.display="block";

    document.getElementById("phone").style.display="block";


    // Auto fill

    document.getElementById("customerName").value = userData.name;

    document.getElementById("phone").value = userData.phone;


}


//creat account

async function createAccount(){

let name=document.getElementById("createName").value;
let phone=document.getElementById("createPhone").value;
let email=document.getElementById("createEmail").value;
let password=document.getElementById("createPassword").value;
let confirm=document.getElementById("confirmPassword").value;


if(password !== confirm){

alert("Password not match");
return;

}


try{

let userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);


let user=userCredential.user;


await addDoc(collection(db,"customers"),{

uid:user.uid,
name:name,
phone:phone,
email:email

});


alert("Account Created");


}catch(error){

alert(error.message);

}

}

//Login 
async function loginUser(){

let email=document.getElementById("loginEmail").value;

let password=document.getElementById("loginPassword").value;


try{

await signInWithEmailAndPassword(
auth,
email,
password
);


alert("Login Successful");


document.getElementById("loginBox").style.display="none";


}catch(error){

alert(error.message);

}

}

//Google Login
async function googleLogin(){

let provider = new GoogleAuthProvider();

try{

let result = await signInWithPopup(auth,provider);

let user = result.user;


// Google থেকে data save

localStorage.setItem("customerName", user.displayName || "");

localStorage.setItem("customerEmail", user.email || "");


document.getElementById("loginBox").style.display="none";

document.getElementById("phoneBox").style.display="block";


}catch(error){

alert(error.message);

}

}
//Google Phone
async function saveGooglePhone(){

    let phone = document.getElementById("googlePhone").value.trim();


    if(phone === ""){

        alert("Please enter phone number");
        return;

    }


    try{

        let user = auth.currentUser;


        if(!user){

            alert("Google login required");
            return;

        }


        await setDoc(
            doc(db,"customers",user.uid),
            {

            uid:user.uid,
            name:user.displayName || "",
            email:user.email || "",
            phone:phone,
            loginType:"Google",
            createdAt:new Date()

            }
        );


        localStorage.setItem("customerPhone",phone);
        localStorage.setItem("customerName",user.displayName);



        alert("Phone Saved Successfully");


        document.getElementById("phoneBox").style.display="none";


        showPage("checkoutPage");


    }
    catch(error){

        console.log("SAVE PHONE ERROR:",error);

        alert(error.message);

    }

}


// Place Order Final

async function placeOrder(){


let customerName =
document.getElementById("customerName").value.trim();


let phone =
document.getElementById("phone").value.trim();


let table="TAKE AWAY";


if(selectedType=="DINE IN"){


let tableInput =
document.getElementById("tableNumber");


if(!tableInput || tableInput.value.trim()==""){

alert("Table Number Required");

return;

}


table=tableInput.value.trim();


}



if(customerName==""){

alert("Customer Name Required");

return;

}


if(phone==""){

alert("Phone Number Required");

return;

}



await addDoc(
collection(db,"orders"),
{

type:selectedType,

tableNumber:table,

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

// Export Functions


window.setLanguage=setLanguage;

window.startMenu=startMenu;

window.openCategory=openCategory;

window.showItems=showItems;

window.addCart=addCart;

window.showCart=showCart;

window.changeQty=changeQty;

window.checkout=checkout;

window.placeOrder=placeOrder;

window.goBack=goBack;

window.goHome=goHome;

window.refreshPage=refreshPage;

window.createAccount=createAccount;

window.loginUser=loginUser;

window.googleLogin=googleLogin;

window.saveGooglePhone = saveGooglePhone;
