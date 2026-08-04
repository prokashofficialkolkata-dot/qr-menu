// =====================================
// RESTORAN HAMEED'S BISTRO
// FIREBASE CONFIG FINAL
// =====================================


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";


import { getFirestore } 
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";




// YOUR NEW FIREBASE PROJECT

const firebaseConfig = {


apiKey: "AIzaSyAZEby6MscIOcgp94iMqAMehOJooyo8LQk",


authDomain: "hameeds-bistro.firebaseapp.com",


projectId: "hameeds-bistro",


storageBucket: "hameeds-bistro.firebasestorage.app",


messagingSenderId: "918800284532",


appId: "1:918800284532:web:5a927c4852f1d657c0ca21"


};





// Initialize Firebase

const app = initializeApp(firebaseConfig);



// Firestore

const db = getFirestore(app);



// Authentication

const auth = getAuth(app);



export {

app,

db,

auth

};
