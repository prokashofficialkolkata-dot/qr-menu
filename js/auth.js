// =====================================
// RESTORAN HAMEED'S BISTRO
// AUTH.JS FINAL FIXED
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

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";



import {

    doc,
    setDoc,
    getDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





const provider =
new GoogleAuthProvider();








// =====================================
// CREATE ACCOUNT
// =====================================


window.createAccount = async function(){


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





if(password.length < 8){


showToast(
"Password minimum 8 characters"
);


return;


}





try{


let result =
await createUserWithEmailAndPassword(

auth,

email,

password

);



let user=result.user;





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
"Account Created"
);



openProfile();



}

catch(error){


showToast(
error.message
);


}



};









// =====================================
// EMAIL LOGIN
// =====================================


window.loginUser = async function(){



let email =
document.getElementById("loginEmail").value.trim();



let password =
document.getElementById("loginPassword").value.trim();




try{


let result =

await signInWithEmailAndPassword(

auth,

email,

password

);



let user=result.user;




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


showToast(
error.message
);


}



};









// =====================================
// GOOGLE LOGIN
// =====================================


window.googleLogin = async function(){

console.log(result.user);

try{


let result =

await signInWithPopup(

auth,

provider

);



let user=result.user;




let ref =

doc(

db,

"customers",

user.uid

);




let snap =

await getDoc(ref);






if(snap.exists()){


// OLD CUSTOMER


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


// NEW CUSTOMER



resetAuthPage();



let profileBox =
document.getElementById(
"profileBox"
);



if(profileBox){

profileBox.style.display="block";

}



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

alert(error.code);

alert(error.message);

}
showToast(
error.message
);


}



};









// =====================================
// SAVE GOOGLE PROFILE
// =====================================


window.saveGoogleProfile = async function(){



let user =
auth.currentUser;



if(!user)return;




let name =
document.getElementById(
"googleName"
).value.trim();



let phone =
document.getElementById(
"googlePhone"
).value.trim();





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




openProfile();



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




if(
typeof resetAuthPage==="function"
){


resetAuthPage();


}




showPage(
"welcome"
);



updateCustomerButton();



showToast(
"Logged Out"
);



}

catch(error){


console.log(error);


}



};









// =====================================
// FIREBASE LOGIN STATE
// =====================================


onAuthStateChanged(

auth,

function(user){



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
typeof updateCustomerButton==="function"
){


updateCustomerButton();


}



}

);
