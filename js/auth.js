// =====================================
// RESTORAN HAMEED'S BISTRO
// AUTH.JS FINAL
// Firebase Authentication
// =====================================


import {
auth,
db
} from "./firebase.js";


import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

GoogleAuthProvider,

signInWithPopup,

signOut,

onAuthStateChanged

}
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";



import {

doc,

setDoc,

getDoc,

serverTimestamp

}
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





const googleProvider =
new GoogleAuthProvider();





// =====================================
// CREATE ACCOUNT
// =====================================


window.createAccount = async function(){


try{


let name =
document.getElementById("createName").value.trim();


let phone =
document.getElementById("createPhone").value.trim();


let email =
document.getElementById("createEmail").value.trim();


let password =
document.getElementById("createPassword").value.trim();


let confirm =
document.getElementById("confirmPassword").value.trim();




if(
!name ||
!phone ||
!email ||
!password
){

showToast(
"Please fill all details"
);

return;

}



if(password !== confirm){

showToast(
"Password not match"
);

return;

}



if(password.length < 6){

showToast(
"Password minimum 6 characters"
);

return;

}




const result =
await createUserWithEmailAndPassword(

auth,

email,

password

);



const user =
result.user;




await setDoc(

doc(
db,
"customers",
user.uid
),

{


name:name,

phone:phone,

email:email,

loginType:"Email",

createdAt:serverTimestamp()


}

);




localStorage.setItem(
"loggedIn",
"yes"
);


localStorage.setItem(
"uid",
user.uid
);



showToast(
"Account Created Successfully"
);



openProfile();



}

catch(error){


console.log(error);


showToast(
error.message
);


}



};






// =====================================
// EMAIL LOGIN
// =====================================


window.loginUser = async function(){



try{


let email =
document.getElementById("loginEmail").value.trim();



let password =
document.getElementById("loginPassword").value.trim();




const result =

await signInWithEmailAndPassword(

auth,

email,

password

);



const user =
result.user;




localStorage.setItem(
"loggedIn",
"yes"
);



localStorage.setItem(
"uid",
user.uid
);



openProfile();



}

catch(error){


console.log(error);


showToast(
error.message
);


}


};






// =====================================
// GOOGLE LOGIN
// =====================================


window.googleLogin = async function(){



try{



const result =

await signInWithPopup(

auth,

googleProvider

);



const user =
result.user;




const ref = doc(

db,

"customers",

user.uid

);



const snap =
await getDoc(ref);




if(
snap.exists()
){


localStorage.setItem(
"loggedIn",
"yes"
);


localStorage.setItem(
"uid",
user.uid
);



openProfile();



}

else{



document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"googleProfileBox"
).style.display="block";




document.getElementById(
"googleName"
).value =
user.displayName || "";



document.getElementById(
"googleEmail"
).value =
user.email || "";



}




}

catch(error){


console.log(error);


showToast(
error.message
);


}



};
// =====================================
// GOOGLE PROFILE SAVE
// =====================================


window.saveGoogleProfile = async function(){


try{


let user = auth.currentUser;



if(!user){

showToast(
"User not found"
);

return;

}



let name =
document.getElementById("googleName").value.trim();


let phone =
document.getElementById("googlePhone").value.trim();



if(!phone){

showToast(
"Phone number required"
);

return;

}




await setDoc(

doc(
db,
"customers",
user.uid
),

{

name:name,

email:user.email,

phone:phone,

loginType:"Google",

createdAt:serverTimestamp()

}


);




localStorage.setItem(
"loggedIn",
"yes"
);


localStorage.setItem(
"uid",
user.uid
);



showToast(
"Profile Completed"
);



openProfile();



}

catch(error){


console.log(error);


showToast(
error.message
);


}


};






// =====================================
// OPEN CUSTOMER PROFILE
// =====================================


window.openProfile = async function(){



showPage(
"checkoutPage"
);




document.getElementById(
"loginBox"
).style.display="none";



document.getElementById(
"createBox"
).style.display="none";



document.getElementById(
"googleProfileBox"
).style.display="none";



document.getElementById(
"checkoutForm"
).style.display="none";



document.getElementById(
"customerProfileBox"
).style.display="block";





let uid =
localStorage.getItem("uid");



if(!uid){

return;

}



try{


const snap =

await getDoc(

doc(
db,
"customers",
uid
)

);





if(
snap.exists()
){



let data =
snap.data();




document.getElementById(
"profileName"
).innerHTML =
data.name || "";



document.getElementById(
"profileEmail"
).innerHTML =
data.email || "";



document.getElementById(
"profilePhone"
).innerHTML =
data.phone || "";



}



}

catch(error){


console.log(error);


}



};








// =====================================
// LOGOUT
// =====================================


window.logoutUser = async function(){



try{


await signOut(auth);



localStorage.removeItem(
"loggedIn"
);



localStorage.removeItem(
"uid"
);



localStorage.removeItem(
"currentPage"
);




showPage(
"welcome"
);



updateCustomerButton();



showToast(
"Logout Successful"
);



}

catch(error){


console.log(error);


showToast(
error.message
);


}



};







// =====================================
// AUTH STATE CHECK
// =====================================


onAuthStateChanged(

auth,

async function(user){



if(user){



localStorage.setItem(
"loggedIn",
"yes"
);



localStorage.setItem(
"uid",
user.uid
);



}

else{


localStorage.removeItem(
"loggedIn"
);


localStorage.removeItem(
"uid"
);


}




if(
typeof updateCustomerButton === "function"
){


updateCustomerButton();


}



}

);
