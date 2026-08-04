// ==========================================
// RESTORAN HAMEED'S BISTRO
// FIREBASE CONFIG V6 FINAL
// ==========================================



import {

initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";





import {

getAuth

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





import {

getFirestore

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// ==========================================
// FIREBASE CONFIG
// ==========================================



const firebaseConfig = {

apiKey: "AIzaSyAZEby6MscIOcgp94iMqAMehOJooyo8LQk",
    authDomain: "hameeds-bistro.firebaseapp.com",
    projectId: "hameeds-bistro",
    storageBucket: "hameeds-bistro.firebasestorage.app",
    messagingSenderId: "918800284532",
    appId: "1:918800284532:web:5a927c4852f1d657c0ca21"
  };









// ==========================================
// INITIALIZE
// ==========================================


const app =

initializeApp(

firebaseConfig

);









// ==========================================
// SERVICES
// ==========================================


export const auth =

getAuth(app);





export const db =

getFirestore(app);
