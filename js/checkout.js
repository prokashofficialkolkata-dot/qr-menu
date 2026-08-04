// =====================================
// RESTORAN HAMEED'S BISTRO
// CHECKOUT.JS (PART 1)
// =====================================

import { db, auth } from "./firebase.js";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


// =====================================
// OPEN CHECKOUT FORM
// =====================================

window.openCheckoutForm = async function () {

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("createBox").style.display = "none";
  document.getElementById("googleProfileBox").style.display = "none";
  document.getElementById("customerProfileBox").style.display = "none";
  document.getElementById("checkoutForm").style.display = "block";

  await loadCustomerData();

};


// =====================================
// LOAD CUSTOMER DATA
// =====================================

async function loadCustomerData() {

  const user = auth.currentUser;

  if (!user) return;

  try {

    const snap = await getDoc(
      doc(db, "customers", user.uid)
    );

    if (snap.exists()) {

      const data = snap.data();

      document.getElementById("customerName").value =
        data.name || "";

      document.getElementById("phone").value =
        data.phone || "";

    }

  } catch (error) {

    console.log(error);

  }

}

// =====================================
// PLACE ORDER
// =====================================

window.placeOrder = async function () {

  try {

    const user = auth.currentUser;

    if (!user) {
      showToast("Please login first");
      return;
    }

    const tableNumber = document
      .getElementById("tableNumber")
      .value
      .trim();

    const customerName = document
      .getElementById("customerName")
      .value
      .trim();

    const phone = document
      .getElementById("phone")
      .value
      .trim();

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    let subtotal = 0;

    cart.forEach(item => {
      subtotal += Number(item.price) * Number(item.qty);
    });

    const sst = subtotal * 0.06;
    const total = subtotal + sst;

    await addDoc(
      collection(db, "orders"),
      {
        customerId: user.uid,
        customerName: customerName,
        phone: phone,
        tableNumber: tableNumber,
        orderType: localStorage.getItem("orderType") || "",
        items: cart,
        subtotal: subtotal,
        sst: sst,
        total: total,
        status: "Pending",
        createdAt: serverTimestamp()
      }
    );

    localStorage.removeItem("cart");

    if (typeof updateCartCount === "function") {
      updateCartCount();
    }

    showToast("Order Placed Successfully");

    setTimeout(() => {
      goHome();
    }, 1500);

  } catch (error) {

    console.log(error);
    showToast(error.message);

  }

};

// =====================================
// AUTH STATE CHANGE
// =====================================

onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  try {

    await loadCustomerData();

  } catch (error) {

    console.log(error);

  }

});


// =====================================
// PAGE LOAD
// =====================================

window.addEventListener("load", () => {

  if (auth.currentUser) {

    loadCustomerData();

  }

});
