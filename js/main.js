// =====================================
// RESTORAN HAMEED'S BISTRO
// MAIN.JS FINAL
// =====================================


let currentPage =
localStorage.getItem("currentPage") || "welcome";


let historyPage=[];





// =====================================
// SHOW PAGE
// =====================================


window.showPage=function(page){


const pages=[

"welcome",
"menuPage",
"cartPage",
"checkoutPage"

];



pages.forEach(function(id){


let el=document.getElementById(id);


if(el){

el.style.display="none";

}


});




let target=document.getElementById(page);



if(target){

target.style.display="block";

}



currentPage=page;



localStorage.setItem(
"currentPage",
page
);



window.scrollTo(0,0);



};









// =====================================
// RESET LOGIN AREA
// =====================================


window.resetAuthPage=function(){



let boxes=[

"loginBox",
"createBox",
"profileBox",
"checkoutForm"

];



boxes.forEach(function(id){


let box=document.getElementById(id);



if(box){

box.style.display="none";

}



});



};









// =====================================
// CUSTOMER BUTTON
// =====================================


window.customerAction=function(){



let login=
localStorage.getItem("loggedIn");



if(login==="yes"){


openProfile();


}

else{


checkout();


}



};











// =====================================
// UPDATE CUSTOMER BUTTON
// =====================================


window.updateCustomerButton=function(){



let btn=document.getElementById(
"customerBtn"
);



if(!btn)return;



let login=
localStorage.getItem("loggedIn");



if(login==="yes"){


btn.innerHTML=
"👤 Customer Profile";


}

else{


btn.innerHTML=
"👤 Customer Login";


}



};











// =====================================
// OPEN PROFILE
// =====================================


window.openProfile=async function(){



showPage(
"checkoutPage"
);



resetAuthPage();



let profile=
document.getElementById(
"profileBox"
);



if(profile){

profile.style.display="block";

}



let uid=
localStorage.getItem("uid");



if(!uid)return;



try{


const {

doc,
getDoc

}=await import(

"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js"

);



const {

db

}=await import(
"./firebase.js"
);





let ref=
doc(
db,
"customers",
uid
);




let snap=
await getDoc(ref);





if(snap.exists()){



let data=snap.data();



let n=
document.getElementById(
"profileName"
);


let e=
document.getElementById(
"profileEmail"
);


let p=
document.getElementById(
"profilePhone"
);




if(n)
n.innerHTML=
"Name : "+(data.name || "");



if(e)
e.innerHTML=
"Email : "+(data.email || "");



if(p)
p.innerHTML=
"Phone : "+(data.phone || "");



}



}

catch(error){


console.log(error);


}



};











// =====================================
// HOME
// =====================================


window.goHome=function(){



historyPage=[];


showPage(
"welcome"
);



updateCustomerButton();



};











// =====================================
// BACK
// =====================================


window.goBack=function(){



let old=
historyPage.pop();



if(old){


showPage(old);


}

else{


showPage("welcome");


}



};











// =====================================
// START MENU
// =====================================


window.startMenu=function(type){



localStorage.setItem(
"orderType",
type
);



historyPage.push(
currentPage
);



showPage(
"menuPage"
);



if(typeof loadCSV==="function"){


loadCSV();


}



};











// =====================================
// REFRESH
// =====================================


window.refreshPage=function(){


location.reload();


};











// =====================================
// CATEGORY
// =====================================


window.openCategory=function(){



let box=
document.getElementById(
"categoryBox"
);



if(!box)return;



if(box.style.display==="grid"){



box.style.display="none";



if(typeof restoreMenuView==="function"){


restoreMenuView();


}



}

else{


box.style.display="grid";



if(typeof loadCategory==="function"){


loadCategory();


}



}



};











// =====================================
// POPULAR
// =====================================


window.showPopular=function(){



showPage(
"menuPage"
);



let box=
document.getElementById(
"categoryBox"
);



if(box){

box.style.display="none";

}



if(typeof showPopularItems==="function"){


showPopularItems();


}



};









// =====================================
// LOGIN PAGE
// =====================================


window.checkout=function(){



historyPage.push(
currentPage
);



showPage(
"checkoutPage"
);



resetAuthPage();



let login=
document.getElementById(
"loginBox"
);



if(login){

login.style.display="block";

}



};











// =====================================
// CREATE ACCOUNT
// =====================================


window.showCreateAccount=function(){



resetAuthPage();



let box=
document.getElementById(
"createBox"
);



if(box){

box.style.display="block";

}



};











// =====================================
// BACK TO LOGIN
// =====================================


window.showLogin=function(){



resetAuthPage();



let box=
document.getElementById(
"loginBox"
);



if(box){

box.style.display="block";

}



};









// =====================================
// CART
// =====================================


window.showCart=function(){



historyPage.push(
currentPage
);



showPage(
"cartPage"
);



if(typeof displayCart==="function"){


displayCart();


}



};









// =====================================
// TOAST
// =====================================


window.showToast=function(message){



let toast=
document.getElementById(
"toast"
);



if(!toast){


toast=document.createElement(
"div"
);


toast.id="toast";


document.body.appendChild(toast);


}




toast.innerHTML=message;



toast.classList.add("show");



setTimeout(function(){


toast.classList.remove("show");


},1000);



};









// =====================================
// CHECK LOGIN
// =====================================


window.checkLoginStatus=function(){



let login=
localStorage.getItem(
"loggedIn"
);



let btns=[

"logoutBtn",
"logoutBtnCart",
"logoutProfileBtn"

];



btns.forEach(function(id){



let btn=
document.getElementById(id);



if(btn){


btn.style.display =
login==="yes"
?
"block"
:
"none";


}



});




updateCustomerButton();



};









// =====================================
// LOAD
// =====================================


window.addEventListener(
"load",
function(){



showPage(
currentPage
);



checkLoginStatus();



});
