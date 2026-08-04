
// =====================================
// MAIN.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================


// CURRENT PAGE

let currentPage = "welcome";

let pageHistory = [];





// =====================================
// SHOW PAGE
// =====================================


window.showPage = function(page){



const pages = [

"welcome",

"menuPage",

"cartPage",

"checkoutPage"

];




pages.forEach(id=>{


let el=document.getElementById(id);


if(el){

el.style.display="none";

}


});






let target=document.getElementById(page);



if(target){

target.style.display="block";

}



currentPage = page;



window.scrollTo(0,0);



};









// =====================================
// HOME
// =====================================


window.goHome=function(){



pageHistory=[];


showPage("welcome");



};










// =====================================
// START MENU
// =====================================


window.startMenu=function(type){



localStorage.setItem(

"orderType",

type

);





let display=document.getElementById(

"orderTypeDisplay"

);



if(display){

display.innerHTML=type;

}






pageHistory.push(currentPage);



showPage("menuPage");






if(window.loadMenu){


loadMenu();


}




};









// =====================================
// BACK BUTTON
// =====================================


window.goBack=function(){



let old=pageHistory.pop();



if(old){


showPage(old);


}

else{


showPage("welcome");


}




};









// =====================================
// CART OPEN
// =====================================


window.showCart=function(){



pageHistory.push(currentPage);



showPage("cartPage");





if(window.displayCart){


displayCart();


}




};









// =====================================
// CHECKOUT
// =====================================


window.checkout=function(){



let cart=JSON.parse(

localStorage.getItem("cart")

)

|| [];





if(cart.length===0){


showToast("Cart Empty");


return;


}





pageHistory.push(currentPage);



showPage("checkoutPage");





if(window.openCheckoutForm){


openCheckoutForm();


}



};









// =====================================
// CUSTOMER LOGIN BUTTON
// =====================================


window.customerAction=function(){



let login=

localStorage.getItem(

"loggedIn"

);





if(login==="yes"){



if(window.openProfile){


openProfile();


}



}

else{



checkout();


}



};









// =====================================
// REFRESH
// =====================================


window.refreshPage=function(){



location.reload();


};









// =====================================
// PAGE START
// =====================================


window.addEventListener(

"load",

()=>{



showPage("welcome");



if(window.updateCartCount){


updateCartCount();


}




}

);
