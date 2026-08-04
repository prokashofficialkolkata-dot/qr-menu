// =====================================
// RESTORAN HAMEED'S BISTRO
// AUTH.JS V2
// PART 1
// =====================================

import { auth, db } from "./firebase.js";

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



// =====================================
// GOOGLE PROVIDER
// =====================================

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
prompt: "select_account"
});



// =====================================
// CREATE ACCOUNT
// =====================================

window.createAccount = async function () {

try {

const name =
document.getElementById("createName").value.trim();

const phone =
document.getElementById("createPhone").value.trim();

const email =
document.getElementById("createEmail").value.trim();

const password =
document.getElementById("createPassword").value.trim();

const confirm =
document.getElementById("confirmPassword").value.trim();

if (!name || !phone || !email || !password || !confirm) {

showToast("Please fill all details");

return;

}

if (password !== confirm) {

showToast("Password does not match");

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

doc(db, "customers", user.uid),

{

uid: user.uid,

name: name,

phone: phone,

email: email,

loginType: "Email",

createdAt: serverTimestamp()

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

showToast("Account Created");

openProfile();

}

catch (error) {

console.log(error);

showToast(error.message);

}

};
// =====================================
// EMAIL LOGIN
// =====================================

window.loginUser = async function () {

    try {

        const email =
        document.getElementById("loginEmail").value.trim();

        const password =
        document.getElementById("loginPassword").value.trim();

        if (!email || !password) {

            showToast("Please enter email and password");

            return;

        }

        const result =
        await signInWithEmailAndPassword(

            auth,
            email,
            password

        );

        const user = result.user;

        // Save Login
        localStorage.setItem(
            "loggedIn",
            "yes"
        );

        localStorage.setItem(
            "uid",
            user.uid
        );

        showToast("Login Successful");

        // Open Customer Profile
        if (typeof openProfile === "function") {

            openProfile();

        }

    }

    catch (error) {

        console.log(error);

        showToast(error.message);

    }

};
// =====================================
// GOOGLE LOGIN
// PC + ANDROID REDIRECT
// =====================================

window.googleLogin = async function(){

    try {

        showToast("Opening Google Login...");


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
// GOOGLE REDIRECT RESULT
// =====================================

window.checkGoogleRedirect = async function(){

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



const customerRef = doc(
db,
"customers",
user.uid
);



const snap = await getDoc(
customerRef
);



if(snap.exists()){


localStorage.setItem(
"loggedIn",
"yes"
);


localStorage.setItem(
"uid",
user.uid
);


if(typeof openProfile === "function"){

openProfile();

}


}

else{


const loginBox =
document.getElementById(
"loginBox"
);


const googleBox =
document.getElementById(
"googleProfileBox"
);



if(loginBox){

loginBox.style.display="none";

}



if(googleBox){

googleBox.style.display="block";

}



const name =
document.getElementById(
"googleName"
);


const email =
document.getElementById(
"googleEmail"
);



if(name){

name.value =
user.displayName || "";

}



if(email){

email.value =
user.email || "";

}


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


};



// Run after page load

window.addEventListener(
"load",
()=>{

if(window.checkGoogleRedirect){

checkGoogleRedirect();

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
document.getElementById("googleName")
.value.trim();



const phone =
document.getElementById("googlePhone")
.value.trim();



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



showToast(
"Profile Completed"
);



if(typeof openProfile === "function"){

openProfile();

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


showPage("welcome");



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
// AUTH STATE LISTENER
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
