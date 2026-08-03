// =====================================
// RESTORAN HAMEED'S BISTRO
// MAIN.JS FINAL
// =====================================


let currentPage = localStorage.getItem("currentPage") || "welcome";

let historyPage = [];




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



};


window.customerAction=function(){

let user =
localStorage.getItem("loggedIn");


if(user==="yes"){

openProfile();

}
else{

checkout();

}

};




// ================================
// HOME
// ================================

window.goHome=function(){


historyPage=[];


showPage("welcome");


};







// ================================
// BACK
// ================================

window.goBack=function(){


let old=historyPage.pop();



if(old){

showPage(old);


}

else{


showPage("welcome");


}


};








// ================================
// START MENU
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
// REAL REFRESH
// ================================


window.refreshPage=function(){



localStorage.setItem(
"currentPage",
currentPage
);



location.reload();



};









// ================================
// CATEGORY TOGGLE
// ================================


window.openCategory=function(){



let box=document.getElementById(
"categoryBox"
);



if(!box)return;




if(
box.style.display==="grid" ||
box.style.display==="flex"
){



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



let box=document.getElementById(
"categoryBox"
);



if(box){

box.style.display="none";

}



if(typeof showPopularItems==="function"){


showPopularItems();


}



};






window.showCreateAccount=function(){


let login=document.getElementById("loginBox");

let create=document.getElementById("createBox");


if(login){

login.style.display="none";

}


if(create){

create.style.display="block";

}


};



window.showLogin=function(){


let login=document.getElementById("loginBox");

let create=document.getElementById("createBox");


if(create){

create.style.display="none";

}


if(login){

login.style.display="block";

}


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
// LOGIN
// ================================


window.checkout=function(){



historyPage.push(currentPage);



showPage("checkoutPage");



if(typeof showLogin==="function"){


showLogin();


}



};









// ================================
// TOAST
// ================================


window.showToast=function(message){



let toast=document.getElementById(
"toast"
);



if(!toast){


toast=document.createElement("div");


toast.id="toast";


document.body.appendChild(toast);


}



toast.innerHTML=message;


toast.classList.add("show");



setTimeout(function(){


toast.classList.remove("show");


},1000);



};








// ================================
// LOGIN STATUS
// ================================


window.checkLoginStatus=function(){



let login=
localStorage.getItem(
"loggedIn"
);



let buttons=[
"logoutBtn",
"logoutBtnCart"
];



buttons.forEach(function(id){



let btn=document.getElementById(id);



if(btn){


btn.style.display =
login==="yes"
?
"block"
:
"none";


}



});



};








// ================================
// START LOAD
// ================================


window.addEventListener(
"load",
function(){



showPage(currentPage);



checkLoginStatus();



}
);
