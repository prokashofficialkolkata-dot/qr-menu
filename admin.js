import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// এখানে আপনার Firebase Config বসাবেন

const firebaseConfig = {
    apiKey: "AIzaSyA-bY4_1pk5QX6dTQPyy2uruB0qBb0c6s0",
    authDomain: "hameed-bistro-qr-menu.firebaseapp.com",
    projectId: "hameed-bistro-qr-menu",
    storageBucket: "hameed-bistro-qr-menu.firebasestorage.app",
    messagingSenderId: "860085792035",
    appId: "1:860085792035:web:9907610b51cd7b73147096"
  };


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);



// LOGIN BUTTON

document.getElementById("loginBtn").addEventListener("click", function(){

const email = document.getElementById("email").value;

const password = document.getElementById("password").value;



signInWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

console.log("Login Success");

document.getElementById("loginBox").style.display="none";

document.getElementById("dashboard").style.display="block";


loadOrders();


})


.catch((error)=>{

console.log(error.message);

document.getElementById("loginMessage").innerHTML =
"Wrong Email or Password";

});


});





// যদি আগে থেকেই Login করা থাকে

onAuthStateChanged(auth,(user)=>{

if(user){

document.getElementById("loginBox").style.display="none";

document.getElementById("dashboard").style.display="block";

loadOrders();

}

});






// LOAD ORDERS FROM FIREBASE

function loadOrders(){


const ordersBox = document.getElementById("orders");


onSnapshot(collection(db,"orders"),(snapshot)=>{


ordersBox.innerHTML="";


snapshot.forEach((orderDoc)=>{


const order = orderDoc.data();



let itemList="";


if(order.items){

order.items.forEach(item=>{

itemList += `
<p>
${item.name} × ${item.qty}
</p>
`;

});

}



ordersBox.innerHTML += `

<div class="orderBox">

<h3>${order.type}</h3>

<p>
Customer: ${order.customerName}
</p>

<p>
Phone: ${order.phone}
</p>


<p>
Table: ${order.tableNumber}
</p>


<h4>Items</h4>

${itemList}


<p>
Status: ${order.status}
</p>


<button onclick="readyOrder('${orderDoc.id}')">
READY
</button>


</div>

`;



});


});


}





window.readyOrder = async function(id){

await updateDoc(doc(db,"orders",id),{

status:"READY"

});


};
