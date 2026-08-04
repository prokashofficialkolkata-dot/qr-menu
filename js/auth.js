// =====================================
// auth.js FINAL V5
// Restoran Hameed's Bistro
// =====================================


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








// =====================================
// CREATE ACCOUNT
// =====================================


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


let result =

await createUserWithEmailAndPassword(

auth,

email,

password

);





await setDoc(

doc(

db,

"users",

result.user.uid

),

{


name:name,

phone:phone,

email:email,

createdAt:new Date()


}



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









// =====================================
// LOGIN
// =====================================


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




let snap = await getDoc(

doc(

db,

"users",

result.user.uid

)

);




if(snap.exists()){



localStorage.setItem(

"customer",

JSON.stringify(

snap.data()

)

);



}



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









// =====================================
// GOOGLE LOGIN
// =====================================


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


phone:""



},

{

merge:true

}



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









// =====================================
// LOGOUT
// =====================================


window.logoutUser=function(){



signOut(auth);



localStorage.removeItem(

"customer"

);



showToast(

"Logged Out"

);



};
