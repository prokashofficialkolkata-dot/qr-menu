// =====================================
// RESTORAN HAMEED'S BISTRO
// FIREBASE.JS FINAL V2
// =====================================


// Firebase SDK

import {

initializeApp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";



import {

getAuth

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";



import {

getFirestore

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";




// =====================================
// FIREBASE CONFIG
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAZEby6MscIOcgp94iMqAMehOJooyo8LQk",
    authDomain: "hameeds-bistro.firebaseapp.com",
    projectId: "hameeds-bistro",
    storageBucket: "hameeds-bistro.firebasestorage.app",
    messagingSenderId: "918800284532",
    appId: "1:918800284532:web:5a927c4852f1d657c0ca21"
  };





// =====================================
// INITIALIZE FIREBASE
// =====================================


const app = initializeApp(firebaseConfig);





// =====================================
// SERVICES
// =====================================


const auth = getAuth(app);


const db = getFirestore(app);





// =====================================
// EXPORT
// =====================================


export {

auth,

db

};
