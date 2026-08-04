
// =====================================
// ADMIN.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================


import { auth, db } from "./firebase.js";



import {


signInWithEmailAndPassword,


signOut


}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {


collection,


getDocs,


addDoc,


deleteDoc,


doc,


setDoc


}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









let adminUser = null;








// =====================================
// ADMIN LOGIN
// =====================================


window.adminLogin = async function(){



let email=document.getElementById(

"adminEmail"

).value;




let password=document.getElementById(

"adminPassword"

).value;






try{



let result = await signInWithEmailAndPassword(

auth,

email,

password

);





adminUser=result.user;






localStorage.setItem(

"adminLogin",

"yes"

);






document.getElementById(

"adminLoginPage"

).style.display="none";





document.getElementById(

"adminDashboard"

).style.display="block";





showToast(

"Admin Login Success"

);





loadDashboard();



}

catch(error){



console.error(error);



document.getElementById(

"adminMessage"

).innerHTML=

"Login Failed";



}



};









// =====================================
// ADMIN LOGOUT
// =====================================


window.adminLogout=function(){



signOut(auth);



localStorage.removeItem(

"adminLogin"

);




location.reload();



};











// =====================================
// DASHBOARD LOAD
// =====================================


async function loadDashboard(){



loadOrders();



loadSales();



loadMenuList();



loadStaff();



}









// =====================================
// SHOW SECTION
// =====================================


window.openAdminSection=function(id){



let sections=[


"orderHistorySection",


"salesReportSection",


"menuUpdateSection",


"staffManagementSection"



];





sections.forEach(x=>{



let el=document.getElementById(x);



if(el){


el.style.display="none";


}



});







let target=document.getElementById(id);



if(target){


target.style.display="block";


}



};
