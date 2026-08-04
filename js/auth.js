// ==========================================
// RESTORAN HAMEED'S BISTRO
// AUTH SYSTEM V6 FINAL
// CUSTOMER LOGIN
// ==========================================


import { auth, db } from "./firebase.js";



import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

GoogleAuthProvider,

signInWithPopup,

signOut

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

doc,

setDoc,

getDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// ==========================================
// CREATE ACCOUNT
// ==========================================


window.createAccount = async function(){



let name =

document.getElementById(

"createName"

).value;




let phone =

document.getElementById(

"createPhone"

).value;




let email =

document.getElementById(

"createEmail"

).value;




let password =

document.getElementById(

"createPassword"

).value;







try{



let user =

await createUserWithEmailAndPassword(

auth,

email,

password

);






await setDoc(

doc(

db,

"users",

user.user.uid

),

{


name:name,

phone:phone,

email:email,

role:"CUSTOMER",

createdAt:new Date()


}

);






localStorage.setItem(

"loggedIn",

"yes"

);



localStorage.setItem(

"uid",

user.user.uid

);



localStorage.setItem(

"customer",

JSON.stringify({

name,

phone,

email

})

);






showToast(

"Account Created"

);





}

catch(error){



console.error(error);



showToast(

error.message

);



}



};
// ==========================================
// LOGIN USER
// ==========================================


window.loginUser = async function(){



let email =

document.getElementById(

"loginEmail"

).value;




let password =

document.getElementById(

"loginPassword"

).value;







try{



let result =

await signInWithEmailAndPassword(

auth,

email,

password

);







let snap =

await getDoc(

doc(

db,

"users",

result.user.uid

)

);







if(snap.exists()){



let data = snap.data();




localStorage.setItem(

"customer",

JSON.stringify(data)

);



}






localStorage.setItem(

"loggedIn",

"yes"

);



localStorage.setItem(

"uid",

result.user.uid

);







showToast(

"Login Successful"

);





}

catch(error){



console.error(error);



showToast(

"Login Failed"

);



}



};









// ==========================================
// GOOGLE LOGIN
// ==========================================


window.googleLogin = async function(){



let provider =

new GoogleAuthProvider();







try{



let result =

await signInWithPopup(

auth,

provider

);







let user = result.user;







await setDoc(

doc(

db,

"users",

user.uid

),

{


name:user.displayName || "",

email:user.email || "",

phone:"",

role:"CUSTOMER"


},


{


merge:true


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







localStorage.setItem(

"customer",

JSON.stringify({

name:user.displayName,

email:user.email,

phone:""

})

);







showToast(

"Google Login Success"

);






}

catch(error){



console.error(error);



showToast(

"Google Login Failed"

);



}



};









// ==========================================
// LOGOUT
// ==========================================


window.logoutUser=function(){



signOut(auth);



localStorage.removeItem(

"loggedIn"

);



localStorage.removeItem(

"uid"

);



localStorage.removeItem(

"customer"

);





showToast(

"Logged Out"

);





};









// ==========================================
// CHECK CURRENT USER
// ==========================================


auth.onAuthStateChanged(

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



}

);
