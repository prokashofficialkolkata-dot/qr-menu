// ==========================================
// RESTORAN HAMEED'S BISTRO
// MAIN SYSTEM V6 FINAL
// PART 1
// ==========================================





// ==========================================
// REFRESH PAGE
// ==========================================


window.refreshPage=function(){


location.reload();


};









// ==========================================
// GO HOME
// ==========================================


window.goHome=function(){



let pages=[

"welcome",

"menuPage",

"cartPage",

"checkoutPage"

];





pages.forEach(id=>{



let el=

document.getElementById(id);



if(el){


el.style.display="none";


}



});







let home =

document.getElementById(

"welcome"

);





if(home){


home.style.display="block";


}



};









// ==========================================
// BACK BUTTON
// ==========================================


window.goBack=function(){



history.back();



};









// ==========================================
// CUSTOMER LOGIN BUTTON
// ==========================================


window.customerAction=function(){



let login =

localStorage.getItem(

"loggedIn"

);






if(login==="yes"){



showCustomerProfile();



}

else{



document.getElementById(

"welcome"

).style.display="none";





document.getElementById(

"checkoutPage"

).style.display="block";





showLogin();



}




};









// ==========================================
// SHOW LOGIN
// ==========================================


window.showLogin=function(){



let login =

document.getElementById(

"loginBox"

);



let create =

document.getElementById(

"createBox"

);





if(login){

login.style.display="block";


}




if(create){

create.style.display="none";


}



};









// ==========================================
// SHOW CREATE ACCOUNT
// ==========================================


window.showCreateAccount=function(){



let login =

document.getElementById(

"loginBox"

);



let create =

document.getElementById(

"createBox"

);





if(login){


login.style.display="none";


}




if(create){


create.style.display="block";


}



};
// ==========================================
// SHOW CUSTOMER PROFILE
// ==========================================


window.showCustomerProfile=function(){



let data =

JSON.parse(

localStorage.getItem(

"customer"

)

)

|| {};







let box =

document.getElementById(

"customerProfileBox"

);






if(box){


box.style.display="block";


}







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






if(name){


name.innerHTML=

"Name: "

+

(data.name || "-");


}







if(email){


email.innerHTML=

"Email: "

+

(data.email || "-");


}







if(phone){


phone.innerHTML=

"Phone: "

+

(data.phone || "-");


}





};









// ==========================================
// SAVE GOOGLE PROFILE
// ==========================================


window.saveGoogleProfile=function(){



let name =

document.getElementById(

"googleName"

).value;





let email =

document.getElementById(

"googleEmail"

).value;





let phone =

document.getElementById(

"googlePhone"

).value;







let customer={



name:name,



email:email,



phone:phone



};







localStorage.setItem(

"customer",

JSON.stringify(customer)

);







document.getElementById(

"googleProfileBox"

).style.display="none";







showToast(

"Profile Saved"

);







goHome();



};









// ==========================================
// UPDATE LOGIN BUTTON
// ==========================================


function updateLoginButton(){



let btn =

document.getElementById(

"customerBtn"

);







if(!btn)return;







if(

localStorage.getItem(

"loggedIn"

)==="yes"

){



btn.innerHTML=

"👤 My Profile";



}

else{



btn.innerHTML=

"👤 Customer Login";



}



}









// ==========================================
// LOGOUT BUTTON DISPLAY
// ==========================================


function updateLogoutButtons(){



let ids=[

"logoutBtn",

"logoutBtnCart",

"logoutCheckoutBtn"

];






ids.forEach(id=>{



let btn =

document.getElementById(id);






if(btn){



btn.style.display=

localStorage.getItem(

"loggedIn"

)==="yes"

?

"block"

:

"none";





}



});



}









// ==========================================
// PAGE LOAD
// ==========================================


window.addEventListener(

"load",

()=>{



updateLoginButton();



updateLogoutButtons();



});
