// =================================
// MAIN.JS
// =================================



let currentPage = "welcome";

let previousPage = [];

let orderType = "";




// ================================
// PAGE SHOW SYSTEM
// ================================


window.showPage = function(page){



// save previous page

if(currentPage !== page){

previousPage.push(currentPage);

}



document.querySelectorAll(

"body > div"

).forEach(function(div){


if(
div.id &&
div.id !== "toast"
){

div.style.display="none";

}


});




let target = document.getElementById(page);



if(target){

target.style.display="block";

currentPage = page;


}




window.scrollTo({

top:0,

behavior:"smooth"

});




// update logout

checkLoginStatus();



};









// ================================
// HOME
// ================================


window.goHome=function(){



previousPage=[];


showPage("welcome");


};










// ================================
// BACK
// ================================


window.goBack=function(){



let last = previousPage.pop();



if(last){


showPage(last);


}

else{


showPage("welcome");


}



};









// ================================
// REFRESH SAME PAGE
// ================================


window.refreshPage=function(){



let page=currentPage;



if(page==="welcome"){

location.reload();

return;

}




showPage(page);




// reload menu data

if(
typeof loadCSV === "function"
){

loadCSV();


}




if(
typeof displayCart === "function"
){

displayCart();


}



showToast(
"Hameed's Bistro Refreshed"
);



};









// ================================
// START MENU
// ================================


window.startMenu=function(type){



orderType=type;


localStorage.setItem(

"orderType",

type

);



showPage("menuPage");



if(
typeof loadCSV === "function"
){

loadCSV();

}



};









// ================================
// POPULAR BUTTON
// ================================


window.showPopular=function(){



showPage("menuPage");



setTimeout(function(){


let section=

document.getElementById(

"popularSection"

);



if(section){


section.scrollIntoView({

behavior:"smooth"

});


}



if(
typeof showPopularItems === "function"

){


showPopularItems();


}



},200);



};









// ================================
// CUSTOMER LOGIN
// ================================


window.checkout=function(){



showPage("checkoutPage");



if(
typeof showLogin === "function"

){


showLogin();


}



};









// ================================
// LOGIN STATUS
// ================================


window.checkLoginStatus=function(){



let login=

localStorage.getItem(

"loggedIn"

);




let buttons=

[

"logoutBtn",

"logoutBtnCart"

];




buttons.forEach(function(id){


let btn=document.getElementById(id);



if(btn){



if(login==="yes"){


btn.style.display="block";


}

else{


btn.style.display="none";


}



}



});



};









// ================================
// DINE / TAKE ORDER TYPE GET
// ================================


window.getOrderType=function(){



return localStorage.getItem(

"orderType"

) || "";



};








// ================================
// INITIAL LOAD
// ================================


window.onload=function(){



currentPage="welcome";



checkLoginStatus();



if(
typeof updateCartCount === "function"
){

updateCartCount();


}



};
