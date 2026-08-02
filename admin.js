import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
collection,
onSnapshot,
doc,
updateDoc,
addDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// YOUR FIREBASE CONFIG HERE

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




function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
    p.style.display="none";
});

document.getElementById(page).style.display="block";

}


window.showPage = showPage;




// LOGIN

document.getElementById("loginBtn").onclick=()=>{


let email=document.getElementById("email").value;

let password=document.getElementById("password").value;


signInWithEmailAndPassword(auth,email,password)

.then(()=>{

document.getElementById("loginBox").style.display="none";

document.getElementById("dashboard").style.display="block";

loadOrders();

})

.catch(e=>{

document.getElementById("loginMessage").innerHTML=
"Login Failed";

});


};





// LOGOUT


document.getElementById("logoutBtn").onclick=()=>{


signOut(auth).then(()=>{

location.reload();

});


};





// AUTO LOGIN


onAuthStateChanged(auth,user=>{

if(user){

document.getElementById("loginBox").style.display="none";

document.getElementById("dashboard").style.display="block";

loadOrders();

}


});






// LOAD ORDERS


function loadOrders(){


const box=document.getElementById("ordersList");


onSnapshot(collection(db,"orders"),snapshot=>{


box.innerHTML="";


snapshot.forEach(orderDoc=>{


let o=orderDoc.data();


if(o.status==="NEW"){



let items="";


o.items.forEach(i=>{

items += `
<div>
${i.name} × ${i.qty}
</div>
`;

});



box.innerHTML += `


<div class="order-card">


<center>
<h3>HAMEED BISTRO</h3>
<b>NEW ORDER</b>
</center>


<hr>


<p>
Customer: ${o.customerName}
</p>


<p>
Phone: ${o.phone}
</p>


<p>
Type: ${o.type}
</p>


<p>
Table: ${o.tableNumber || "TAKE AWAY"}
</p>


<hr>

${items}


<hr>


<button class="ready-btn"
onclick="readyOrder('${orderDoc.id}')">

READY

</button>


</div>



`;



}



});


});


}






// READY BUTTON


window.readyOrder=async function(id){


let ref=doc(db,"orders",id);


await updateDoc(ref,{

status:"COMPLETED",

completedTime:serverTimestamp()

});


};
