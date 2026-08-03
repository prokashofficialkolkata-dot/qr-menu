// Firebase Config

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyA-bY4_1pk5QX6dTQPyy2uruB0qBb0c6s0",

authDomain: "hameed-bistro-qr-menu.firebaseapp.com",

projectId: "hameed-bistro-qr-menu",

storageBucket: "hameed-bistro-qr-menu.firebasestorage.app",

messagingSenderId: "860085792035",

appId: "1:860085792035:web:9907610b51cd7b73147096"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };
