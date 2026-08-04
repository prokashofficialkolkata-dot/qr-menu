// =====================================
// RESTORAN HAMEED'S BISTRO
// FIREBASE.JS FINAL
// =====================================


// Firebase App

import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";



// Firestore

import { getFirestore }

from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



// Authentication

import { getAuth }

from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";






// Firebase Configuration

const firebaseConfig = {


apiKey: "AIzaSyA-b4Y_1pk5QX6dTQPyy2uruB0qBb0c6s0",


authDomain: "hameed-bistro-qr-menu.firebaseapp.com",


projectId: "hameed-bistro-qr-menu",


storageBucket: "hameed-bistro-qr-menu.firebasestorage.app",


messagingSenderId: "860085792035",


appId: "1:860085792035:web:9907610b51cd7b73147096"


};







// Initialize Firebase

const app = initializeApp(firebaseConfig);






// Firestore Database

const db = getFirestore(app);






// Firebase Authentication

const auth = getAuth(app);







export {

app,

db,

auth

};
