import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


// ===============================
// Create Account
// ===============================

window.createAccount = async function(){

const name =
document.getElementById("createName").value.trim();

const phone =
document.getElementById("createPhone").value.trim();

const email =
document.getElementById("createEmail").value.trim();

const password =
document.getElementById("createPassword").value;

const confirm =
document.getElementById("confirmPassword").value;

if(password !== confirm){

alert("Password does not match");

return;

}

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(
doc(db,"customers",userCredential.user.uid),
{
uid:userCredential.user.uid,
name,
phone,
email,
loginType:"Email"
}
);

alert("Account Created Successfully");

showLogin();

}catch(error){

alert(error.message);

}

};


// ===============================
// Email Login
// ===============================

window.loginUser = async function(){

const email =
document.getElementById("loginEmail").value.trim();

const password =
document.getElementById("loginPassword").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

}catch(error){

alert(error.message);

}

};


// ===============================
// Google Login
// ===============================

window.googleLogin = async function(){

const provider =
new GoogleAuthProvider();

try{

await signInWithPopup(auth,provider);

}catch(error){

alert(error.message);

}

};
// ====================================
// Auth State Listener
// ====================================

onAuthStateChanged(auth, async(user)=>{

if(!user){

return;

}

const ref = doc(db,"customers",user.uid);

const snap = await getDoc(ref);

if(snap.exists()){

const data = snap.data();

// যদি Phone আগে থেকেই থাকে
if(data.phone){

localStorage.setItem("customerName",data.name);

localStorage.setItem("customerPhone",data.phone);

localStorage.setItem("customerEmail",data.email);

if(typeof openCheckoutForm==="function"){

openCheckoutForm();

}

}else{

// Phone না থাকলে Complete Profile দেখাবে
document.getElementById("loginBox").style.display="none";
document.getElementById("createBox").style.display="none";
document.getElementById("phoneBox").style.display="block";

}

}else{

// Google Login-এর পরে প্রথমবার Firestore Record না থাকলে
document.getElementById("loginBox").style.display="none";
document.getElementById("createBox").style.display="none";
document.getElementById("phoneBox").style.display="block";

}

});



// ====================================
// Save Google Phone
// ====================================

window.saveGooglePhone = async function(){

const phone =
document.getElementById("googlePhone").value.trim();

if(phone==""){

alert("Phone Number Required");

return;

}

const user = auth.currentUser;

await setDoc(doc(db,"customers",user.uid),{

uid:user.uid,

name:user.displayName || "",

email:user.email || "",

phone:phone,

loginType:"Google"

});

localStorage.setItem("customerName",user.displayName || "");

localStorage.setItem("customerPhone",phone);

localStorage.setItem("customerEmail",user.email || "");

if(typeof openCheckoutForm==="function"){

openCheckoutForm();

}

};



// ====================================
// Logout
// ====================================

window.logoutUser = async function(){

await signOut(auth);

localStorage.removeItem("customerName");
localStorage.removeItem("customerPhone");
localStorage.removeItem("customerEmail");

location.reload();

};
