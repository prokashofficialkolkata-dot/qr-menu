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
