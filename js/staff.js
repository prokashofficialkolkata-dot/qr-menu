// =====================================
// STAFF.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================

import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// =====================================
// STAFF LOGIN
// =====================================

window.staffLogin = async function () {

    const email = document.getElementById("staffEmail").value.trim();
    const password = document.getElementById("staffPassword").value;

    const msg = document.getElementById("staffMessage");
    msg.innerHTML = "";

    if (!email || !password) {
        msg.innerHTML = "Enter Email & Password";
        return;
    }

    try {

        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = result.user.uid;

        const snap = await getDoc(
            doc(db, "staff", uid)
        );

        if (!snap.exists()) {

            await signOut(auth);

            msg.innerHTML = "Staff Not Found";

            return;

        }

        const staff = snap.data();

        localStorage.setItem("staffLogin", "yes");
        localStorage.setItem("staffUID", uid);
        localStorage.setItem("staffName", staff.name || "");
        localStorage.setItem("staffRole", staff.role || "staff");



        // Attendance

        const today = new Date().toISOString().substring(0, 10);

        await setDoc(

            doc(db, "attendance", uid + "_" + today),

            {

                uid: uid,

                name: staff.name,

                role: staff.role,

                loginTime: serverTimestamp(),

                date: today

            },

            { merge: true }

        );



        msg.innerHTML = "Login Successful";



        // redirect

        if (staff.role === "cashier") {

            location.href = "cashier.html";

        }

        else {

            location.href = "kitchen.html";

        }

    }

    catch (error) {

        console.error(error);

        msg.innerHTML = "Login Failed";

    }

};



// =====================================
// STAFF LOGOUT
// =====================================

window.staffLogout = async function () {

    await signOut(auth);

    localStorage.removeItem("staffLogin");
    localStorage.removeItem("staffUID");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffRole");

    location.href = "staff.html";

};
