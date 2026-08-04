// =====================================
// RESTORAN HAMEED'S BISTRO
// ADMIN.JS V2
// PART 1
// =====================================


import {

auth,
db

} from "./firebase.js";



import {

signInWithEmailAndPassword,
signOut,
onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";




// =====================================
// ADMIN LOGIN
// =====================================


window.adminLogin = async function(){


try{


const email =
document
.getElementById("adminEmail")
.value
.trim();



const password =
document
.getElementById("adminPassword")
.value
.trim();



if(!email || !password){


showAdminMessage(
"Enter email and password"
);


return;


}




await signInWithEmailAndPassword(

auth,

email,

password

);





document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"dashboard"
).style.display="block";





showAdminMessage(
"Login Successful"
);




loadOrders();



loadMenu();



}



catch(error){



console.log(
error
);



showAdminMessage(
error.message
);



}



};







// =====================================
// ADMIN LOGOUT
// =====================================


window.adminLogout = async function(){


try{


await signOut(auth);



document.getElementById(
"dashboard"
).style.display="none";



document.getElementById(
"loginBox"
).style.display="block";



showAdminMessage(
"Logout Successful"
);



}

catch(error){


console.log(error);



}



};









// =====================================
// AUTH CHECK
// =====================================


onAuthStateChanged(

auth,

(user)=>{


if(user){



document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"dashboard"
).style.display="block";



loadOrders();



loadMenu();



}

else{



document.getElementById(
"loginBox"
).style.display="block";



document.getElementById(
"dashboard"
).style.display="none";


}



}

);









// =====================================
// MESSAGE
// =====================================


window.showAdminMessage=function(message){


const box =
document.getElementById(
"loginMessage"
);



if(box){


box.innerHTML =
message;


}



};
