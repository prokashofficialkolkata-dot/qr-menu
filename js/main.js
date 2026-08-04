// =====================================
// RESTORAN HAMEED'S BISTRO
// MAIN.JS V2
// PART 1
// =====================================


let currentPage =
localStorage.getItem("currentPage") || "welcome";



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



pages.forEach((id)=>{


const el =
document.getElementById(id);



if(el){

el.style.display="none";

}


});



const target =
document.getElementById(page);



if(target){

target.style.display="block";

}



currentPage = page;



localStorage.setItem(
"currentPage",
page
);



window.scrollTo(0,0);


};





// =====================================
// CUSTOMER BUTTON
// =====================================

window.customerAction = function(){


const login =
localStorage.getItem("loggedIn");



if(login === "yes"){


openProfile();


}

else{


checkout();


}


};





// =====================================
// UPDATE CUSTOMER BUTTON
// =====================================

window.updateCustomerButton = function(){


const btn =
document.getElementById(
"customerBtn"
);



if(!btn)return;



const login =
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





// =====================================
// LOGIN STATUS
// =====================================

window.checkLoginStatus=function(){


const login =
localStorage.getItem(
"loggedIn"
);



updateCustomerButton();



const buttons=[

"logoutBtn",
"logoutCheckoutBtn",
"logoutProfileBtn"

];



buttons.forEach((id)=>{


const btn =
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


};
// =====================================
// OPEN CUSTOMER PROFILE
// =====================================

window.openProfile = async function(){


showPage("checkoutPage");



const loginBox =
document.getElementById("loginBox");


const createBox =
document.getElementById("createBox");


const googleBox =
document.getElementById("googleProfileBox");


const profileBox =
document.getElementById("customerProfileBox");


const checkoutForm =
document.getElementById("checkoutForm");



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





const uid =
localStorage.getItem("uid");



if(!uid){

return;

}



try{


const {

doc,
getDoc

} = await import(
"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js"
);



const {

db

} = await import(
"./firebase.js"
);




const ref =
doc(
db,
"customers",
uid
);



const snap =
await getDoc(ref);




if(snap.exists()){


const data =
snap.data();



const name =
document.getElementById(
"profileName"
);


const email =
document.getElementById(
"profileEmail"
);


const phone =
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


console.log(
"Profile Load Error:",
error
);


}


};




// =====================================
// HOME
// =====================================

window.goHome=function(){


showPage("welcome");


checkLoginStatus();


};
// =====================================
// PAGE HISTORY
// =====================================

let historyPage = [];




// =====================================
// START MENU
// =====================================

window.startMenu = function(type){


localStorage.setItem(
"orderType",
type
);



historyPage.push(currentPage);



showPage("menuPage");



if(typeof loadCSV === "function"){

loadCSV();

}



};





// =====================================
// OPEN CART
// =====================================

window.showCart = function(){


historyPage.push(currentPage);



showPage("cartPage");



if(typeof displayCart === "function"){

displayCart();

}



};





// =====================================
// CHECKOUT
// =====================================

window.checkout = function(){


historyPage.push(currentPage);



showPage("checkoutPage");



const login =
localStorage.getItem("loggedIn");



if(login==="yes"){


if(typeof openCheckoutForm === "function"){

openCheckoutForm();

}

else{


openProfile();


}



}

else{


if(typeof showLogin === "function"){

showLogin();

}


}



};





// =====================================
// BACK BUTTON
// =====================================

window.goBack=function(){


const oldPage =
historyPage.pop();



if(oldPage){


showPage(oldPage);


}

else{


showPage("welcome");


}



};





// =====================================
// REFRESH
// =====================================

window.refreshPage=function(){


location.reload();


};
// =====================================
// SHOW CREATE ACCOUNT
// =====================================

window.showCreateAccount=function(){


const login =
document.getElementById("loginBox");


const create =
document.getElementById("createBox");



if(login){

login.style.display="none";

}



if(create){

create.style.display="block";

}



};





// =====================================
// SHOW LOGIN
// =====================================

window.showLogin=function(){


const login =
document.getElementById("loginBox");


const create =
document.getElementById("createBox");



if(create){

create.style.display="none";

}



if(login){

login.style.display="block";

}



};





// =====================================
// TOAST MESSAGE
// =====================================

window.showToast=function(message){


let toast =
document.getElementById("toast");



if(!toast){


toast =
document.createElement("div");


toast.id="toast";


document.body.appendChild(toast);


}



toast.innerHTML =
message;



toast.classList.add("show");



setTimeout(()=>{


toast.classList.remove("show");


},1500);



};





// =====================================
// APP START
// =====================================

window.addEventListener(
"load",
async function(){


showPage(currentPage);



checkLoginStatus();



if(window.checkGoogleRedirect){


await window.checkGoogleRedirect();


}



});
