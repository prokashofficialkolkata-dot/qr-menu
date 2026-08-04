// =====================================
// RESTORAN HAMEED'S BISTRO
// AUTH.JS FINAL CLEAN VERSION
// PART 1
// =====================================


import {
    auth,
    db
} from "./firebase.js";


import {

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


import {

    doc,
    setDoc,
    getDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";




// GOOGLE PROVIDER

const googleProvider = new GoogleAuthProvider();




// =====================================
// CREATE ACCOUNT
// =====================================


window.createAccount = async function(){


try{


const name =
document.getElementById("createName")
.value.trim();


const phone =
document.getElementById("createPhone")
.value.trim();


const email =
document.getElementById("createEmail")
.value.trim();


const password =
document.getElementById("createPassword")
.value.trim();


const confirm =
document.getElementById("confirmPassword")
.value.trim();



if(!name || !phone || !email || !password){

showToast("Please fill all details");
return;

}



if(password !== confirm){

showToast("Password not match");
return;

}




const result =
await createUserWithEmailAndPassword(

auth,
email,
password

);



const user = result.user;




await setDoc(

doc(
db,
"customers",
user.uid
),

{

uid:user.uid,

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


const email =
document.getElementById("loginEmail")
.value.trim();


const password =
document.getElementById("loginPassword")
.value.trim();



if(!email || !password){

showToast(
"Please enter email and password"
);

return;

}




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



showToast(
"Login Successful"
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
// ANDROID + PC
// =====================================

window.googleLogin = async function(){

try{

await signInWithRedirect(
auth,
googleProvider
);

}

catch(error){

console.log(
"Google Login Error:",
error
);

showToast(
error.message
);

}

};





// =====================================
// GOOGLE USER CHECK
// =====================================

onAuthStateChanged(auth, async (user)=>{


if(!user){

return;

}



console.log("Firebase User:", user.email);



const ref =
doc(
db,
"customers",
user.uid
);



const snap =
await getDoc(ref);



if(snap.exists()){


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


const loginBox =
document.getElementById("loginBox");


const googleBox =
document.getElementById("googleProfileBox");



if(loginBox)
loginBox.style.display="none";



if(googleBox)
googleBox.style.display="block";



document.getElementById("googleName").value =
user.displayName || "";



document.getElementById("googleEmail").value =
user.email || "";



}


});



// =====================================
// SAVE GOOGLE PROFILE
// =====================================



window.saveGoogleProfile = async function(){

try{

const user = auth.currentUser;

if(!user){

showToast("User not found");
return;

}


const name =
document.getElementById("googleName").value.trim();


const phone =
document.getElementById("googlePhone").value.trim();


if(!phone){

showToast("Phone number required");
return;

}



await setDoc(

doc(
db,
"customers",
user.uid
),

{

uid:user.uid,
name:name,
email:user.email,
phone:phone,
loginType:"Google",
createdAt:serverTimestamp()

}

);



localStorage.setItem("loggedIn","yes");

localStorage.setItem("uid",user.uid);



showToast("Google Profile Saved");


openProfile();



}

catch(error){

console.log("Firestore Save Error:",error);

showToast(error.message);

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



if(typeof updateCustomerButton === "function"){

updateCustomerButton();

}



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
// AUTH STATE
// =====================================


onAuthStateChanged(

auth,

(user)=>{


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



if(typeof updateCustomerButton === "function"){

updateCustomerButton();

}



}

);


// =====================================
// CHECK GOOGLE REDIRECT RESULT
// =====================================

async function checkGoogleRedirect(){

try{


const result = await getRedirectResult(auth);


if(!result){

return;

}



const user = result.user;


console.log(
"Google User:",
user
);



const ref = doc(
db,
"customers",
user.uid
);



const snap = await getDoc(ref);



if(snap.exists()){


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


let loginBox =
document.getElementById("loginBox");


let googleBox =
document.getElementById("googleProfileBox");



if(loginBox){

loginBox.style.display="none";

}



if(googleBox){

googleBox.style.display="block";

}



document.getElementById("googleName").value =
user.displayName || "";



document.getElementById("googleEmail").value =
user.email || "";


}



}

catch(error){


console.log(
"Google Redirect Error:",
error
);


showToast(
error.message
);


}


}


checkGoogleRedirect();


