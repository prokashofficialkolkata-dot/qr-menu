// =====================================
// RESTORAN HAMEED'S BISTRO
// MAIN.JS FINAL UPDATED
// =====================================


let currentPage =
localStorage.getItem("currentPage") || "welcome";


let historyPage=[];




// ================================
// SHOW PAGE
// ================================

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







// ================================
// CUSTOMER ACTION
// ================================


window.customerAction=function(){


let login =
localStorage.getItem("loggedIn");



if(login==="yes"){


openProfile();


}

else{


checkout();


}



};








// ================================
// UPDATE CUSTOMER BUTTON
// ================================


window.updateCustomerButton=function(){


let btn =
document.getElementById(
"customerBtn"
);



if(!btn)return;



let login =
localStorage.getItem("loggedIn");



if(login==="yes"){


btn.innerHTML =
"👤 Customer Profile";


}

else{


btn.innerHTML =
"👤 Customer Login";


}



};









// ================================
// OPEN PROFILE
// ================================


window.openProfile=async function(){



showPage("checkoutPage");



let loginBox =
document.getElementById(
"loginBox"
);


let createBox =
document.getElementById(
"createBox"
);


let googleBox =
document.getElementById(
"googleProfileBox"
);


let profileBox =
document.getElementById(
"customerProfileBox"
);


let checkoutForm =
document.getElementById(
"checkoutForm"
);




if(loginBox)
loginBox.style.display="none";


if(createBox)
createBox.style.display="none";


if(googleBox)
googleBox.style.display="none";


if(checkoutForm)
checkoutForm.style.display="none";



if(profileBox)
profileBox.style.display="block";





let uid =
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




let ref =
doc(
db,
"customers",
uid
);




let snap =
await getDoc(ref);





if(snap.exists()){


let data =
snap.data();



let name =
document.getElementById(
"profileName"
);


let email =
document.getElementById(
"profileEmail"
);


let phone =
document.getElementById(
"profilePhone"
);





if(name)
name.innerHTML =
data.name || "";



if(email)
email.innerHTML =
data.email || "";



if(phone)
phone.innerHTML =
data.phone || "";



}



}

catch(error){


console.log(error);


}



};









// ================================
// HOME
// ================================


window.goHome=function(){



historyPage=[];


showPage("welcome");


updateCustomerButton();


checkLoginStatus();



};








// ================================
// BACK
// ================================


window.goBack=function(){



let old =
historyPage.pop();



if(old){


showPage(old);


}

else{


showPage("welcome");


}



};









// ================================
// MENU START
// ================================


window.startMenu=function(type){



localStorage.setItem(
"orderType",
type
);



historyPage.push(currentPage);



showPage("menuPage");



if(typeof loadCSV==="function"){

loadCSV();

}



};









// ================================
// REFRESH
// ================================


window.refreshPage=function(){


location.reload();


};









// ================================
// CATEGORY
// ================================


window.openCategory=function(){



let box =
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









// ================================
// POPULAR
// ================================


window.showPopular=function(){



showPage("menuPage");



let box =
document.getElementById(
"categoryBox"
);



if(box)

box.style.display="none";




if(typeof showPopularItems==="function"){

showPopularItems();

}



};









// ================================
// CREATE ACCOUNT SWITCH
// ================================


window.showCreateAccount=function(){



let login =
document.getElementById(
"loginBox"
);


let create =
document.getElementById(
"createBox"
);



if(login)

login.style.display="none";



if(create)

create.style.display="block";



};








window.showLogin=function(){



let login =
document.getElementById(
"loginBox"
);


let create =
document.getElementById(
"createBox"
);



if(create)

create.style.display="none";



if(login)

login.style.display="block";



};









// ================================
// CART
// ================================


window.showCart=function(){



historyPage.push(currentPage);



showPage("cartPage");



if(typeof displayCart==="function"){


displayCart();


}



};









// ================================
// CHECKOUT
// ================================


window.checkout=function(){


historyPage.push(currentPage);



showPage("checkoutPage");



let login =
localStorage.getItem("loggedIn");



if(login==="yes"){


if(typeof openCheckoutForm==="function"){

openCheckoutForm();

}
else{

openProfile();

}



}

else{


showLogin();


}



};









// ================================
// LOGIN STATUS
// ================================


window.checkLoginStatus=function(){



let login =
localStorage.getItem(
"loggedIn"
);



let buttons=[

"logoutBtn",
"logoutBtnCart",
"logoutCheckoutBtn",
"logoutProfileBtn"

];



buttons.forEach(function(id){



let btn =
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









// ================================
// TOAST
// ================================


window.showToast=function(message){



let toast =
document.getElementById(
"toast"
);



if(!toast){


toast=document.createElement("div");


toast.id="toast";


document.body.appendChild(toast);


}




toast.innerHTML=message;


toast.classList.add("show");



setTimeout(()=>{


toast.classList.remove("show");


},1200);



};









// ================================
// LOAD
// ================================


window.addEventListener("load", async function(){

    showPage(currentPage);

    checkLoginStatus();

    if (typeof checkGoogleRedirect === "function") {
        await checkGoogleRedirect();
    }

});
