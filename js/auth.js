// ==========================================
// RESTORAN HAMEED'S BISTRO
// AUTH.JS
// PART 1
// ==========================================

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
getDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



// ==========================================
// GOOGLE PROVIDER
// ==========================================

const provider = new GoogleAuthProvider();



// ==========================================
// HELPER
// ==========================================

function $(id){

    return document.getElementById(id);

}



// ==========================================
// HIDE ALL BOX
// ==========================================

window.hideAllAuthBoxes=function(){

    const boxes=[

        "loginBox",
        "createBox",
        "googleProfileBox",
        "customerProfileBox",
        "checkoutForm"

    ];

    boxes.forEach(function(id){

        let box=$(id);

        if(box){

            box.style.display="none";

        }

    });

};



// ==========================================
// LOGIN PAGE
// ==========================================

window.showLogin=function(){

    hideAllAuthBoxes();

    $("loginBox").style.display="block";

};



// ==========================================
// CREATE ACCOUNT PAGE
// ==========================================

window.showCreateAccount=function(){

    hideAllAuthBoxes();

    $("createBox").style.display="block";

};



// ==========================================
// GOOGLE PROFILE PAGE
// ==========================================

window.showGoogleProfile=function(){

    hideAllAuthBoxes();

    $("googleProfileBox").style.display="block";

};



// ==========================================
// CUSTOMER PROFILE PAGE
// ==========================================

window.showCustomerProfile=function(){

    hideAllAuthBoxes();

    $("customerProfileBox").style.display="block";

};



// ==========================================
// CHECKOUT FORM
// ==========================================

window.showCheckoutForm=function(){

    hideAllAuthBoxes();

    $("checkoutForm").style.display="block";

};



// ==========================================
// AUTH STATE
// ==========================================

onAuthStateChanged(auth,function(user){

    if(user){

        localStorage.setItem("loggedIn","yes");

        localStorage.setItem("uid",user.uid);

    }

    else{

        localStorage.removeItem("loggedIn");

        localStorage.removeItem("uid");

    }

    if(typeof updateCustomerButton==="function"){

        updateCustomerButton();

    }

});
// ==========================================
// CREATE ACCOUNT
// ==========================================

window.createAccount = async function () {

    const name = $("createName").value.trim();
    const phone = $("createPhone").value.trim();
    const email = $("createEmail").value.trim();
    const password = $("createPassword").value;
    const confirm = $("confirmPassword").value;

    if (!name || !phone || !email || !password || !confirm) {

        showToast("Please fill all fields");
        return;

    }

    if (password !== confirm) {

        showToast("Passwords do not match");
        return;

    }

    if (password.length < 6) {

        showToast("Password must be at least 6 characters");
        return;

    }

    try {

        const result = await createUserWithEmailAndPassword(

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

        localStorage.setItem("loggedIn", "yes");
        localStorage.setItem("uid", user.uid);

        showToast("Account Created Successfully");

        if (typeof openProfile === "function") {

            openProfile();

        }

    }

    catch (error) {

        showToast(error.message);

    }

};
// ==========================================
// EMAIL LOGIN
// ==========================================

window.loginUser = async function () {

    const email = $("loginEmail").value.trim();
    const password = $("loginPassword").value;

    if (!email || !password) {

        showToast("Enter email and password");
        return;

    }

    try {

        const result = await signInWithEmailAndPassword(

            auth,
            email,
            password

        );

        const user = result.user;

        localStorage.setItem("loggedIn", "yes");
        localStorage.setItem("uid", user.uid);

        showToast("Login Successful");

        if (typeof checkLoginStatus === "function") {

            checkLoginStatus();

        }

        if (typeof updateCustomerButton === "function") {

            updateCustomerButton();

        }

        // Open Customer Profile
        if (typeof openProfile === "function") {

            openProfile();

        }

    }

    catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                showToast("Invalid Email or Password");
                break;

            case "auth/user-not-found":
                showToast("User not found");
                break;

            case "auth/wrong-password":
                showToast("Wrong Password");
                break;

            case "auth/invalid-email":
                showToast("Invalid Email");
                break;

            default:
                showToast(error.message);

        }

    }

};
// ==========================================
// GOOGLE LOGIN
// ==========================================

window.googleLogin = async function () {

    try {

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        localStorage.setItem("loggedIn", "yes");
        localStorage.setItem("uid", user.uid);

        const ref = doc(db, "customers", user.uid);

        const snap = await getDoc(ref);

        // ==========================
        // OLD CUSTOMER
        // ==========================

        if (snap.exists()) {

            if (typeof checkLoginStatus === "function") {

                checkLoginStatus();

            }

            if (typeof updateCustomerButton === "function") {

                updateCustomerButton();

            }

            showToast("Welcome Back");

            if (typeof openProfile === "function") {

                openProfile();

            }

            return;

        }

        // ==========================
        // NEW GOOGLE CUSTOMER
        // ==========================

        showGoogleProfile();

        $("googleName").value = user.displayName || "";

        $("googleEmail").value = user.email || "";

        $("googlePhone").value = "";

    }

    catch (error) {

        console.log(error);

        if (error.code === "auth/popup-closed-by-user") {

            showToast("Google Login Cancelled");

            return;

        }

        if (error.code === "auth/cancelled-popup-request") {

            return;

        }

        showToast(error.message);

    }

};
// ==========================================
// SAVE GOOGLE PROFILE
// ==========================================

window.saveGoogleProfile = async function () {

    try {

        const user = auth.currentUser;

        if (!user) {

            showToast("Please login again");
            return;

        }

        const name = $("googleName").value.trim();
        const phone = $("googlePhone").value.trim();

        if (name === "") {

            showToast("Enter your name");
            return;

        }

        if (phone === "") {

            showToast("Enter phone number");
            return;

        }

        await setDoc(

            doc(db, "customers", user.uid),

            {

                uid: user.uid,

                name: name,

                email: user.email,

                phone: phone,

                loginType: "Google",

                createdAt: serverTimestamp()

            }

        );

        localStorage.setItem("loggedIn", "yes");
        localStorage.setItem("uid", user.uid);

        if (typeof checkLoginStatus === "function") {

            checkLoginStatus();

        }

        if (typeof updateCustomerButton === "function") {

            updateCustomerButton();

        }

        showToast("Profile Saved");

        if (typeof openProfile === "function") {

            openProfile();

        }

    }

    catch (error) {

        console.error(error);

        showToast(error.message);

    }

};
// ==========================================
// LOAD CUSTOMER PROFILE
// ==========================================

window.loadCustomerProfile = async function () {

    try {

        const uid = localStorage.getItem("uid");

        if (!uid) return;

        const ref = doc(db, "customers", uid);

        const snap = await getDoc(ref);

        if (!snap.exists()) {

            showToast("Customer profile not found");
            return;

        }

        const data = snap.data();

        // Customer Profile
        if ($("profileName")) {
            $("profileName").textContent = data.name || "";
        }

        if ($("profileEmail")) {
            $("profileEmail").textContent = data.email || "";
        }

        if ($("profilePhone")) {
            $("profilePhone").textContent = data.phone || "";
        }

        // Checkout Form
        if ($("customerName")) {
            $("customerName").value = data.name || "";
        }

        if ($("phone")) {
            $("phone").value = data.phone || "";
        }

    }

    catch (error) {

        console.error(error);

        showToast("Failed to load profile");

    }

};



// ==========================================
// LOGOUT
// ==========================================

window.logoutUser = async function () {

    try {

        await signOut(auth);

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("uid");

        if (typeof checkLoginStatus === "function") {
            checkLoginStatus();
        }

        if (typeof updateCustomerButton === "function") {
            updateCustomerButton();
        }

        showLogin();

        if (typeof goHome === "function") {
            goHome();
        }

        showToast("Logged Out");

    }

    catch (error) {

        console.error(error);

        showToast(error.message);

    }

};
