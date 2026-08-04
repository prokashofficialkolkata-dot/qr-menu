// ==========================================
// RESTORAN HAMEED'S BISTRO
// ADMIN PANEL V2
// PART 1
// ==========================================


import { auth, db } from "./firebase.js";



import {

signInWithEmailAndPassword,

signOut

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

collection,

getDocs

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// ==========================================
// ADMIN LOGIN
// ==========================================


window.adminLogin = async function(){



let email =

document.getElementById(
"adminEmail"
).value;




let password =

document.getElementById(
"adminPassword"
).value;





let msg =

document.getElementById(
"adminMessage"
);





try{


let result =

await signInWithEmailAndPassword(

auth,

email,

password

);





localStorage.setItem(

"adminLogin",

"yes"

);





document.getElementById(
"adminLoginPage"
).style.display="none";





document.getElementById(
"adminDashboard"
).style.display="block";






showToast(
"Admin Login Successful"
);





}

catch(error){


console.error(error);



if(msg){

msg.innerHTML =
"Login Failed";

}



}



};









// ==========================================
// ADMIN LOGOUT
// ==========================================


window.adminLogout=function(){



signOut(auth);



localStorage.removeItem(
"adminLogin"
);



location.reload();



};









// ==========================================
// OPEN ADMIN SECTION
// ==========================================


window.openAdminSection=function(section){



let sections=[

"ordersSection",

"salesSection",

"menuSection",

"staffSection"

];





sections.forEach(id=>{


let box =
document.getElementById(id);



if(box){


box.style.display="none";


}



});







let target =

document.getElementById(section);



if(target){


target.style.display="block";


}



};









// ==========================================
// PAGE LOAD CHECK
// ==========================================


window.addEventListener(

"load",

()=>{


let login =

localStorage.getItem(
"adminLogin"
);





if(login==="yes"){


document.getElementById(
"adminLoginPage"
).style.display="none";



document.getElementById(
"adminDashboard"
).style.display="block";



}



}

);









// ==========================================
// TOAST
// ==========================================


window.showToast =

window.showToast ||

function(text){



let toast =

document.getElementById(
"toast"
);



if(!toast)return;



toast.innerHTML=text;



toast.classList.add(
"show"
);



setTimeout(()=>{


toast.classList.remove(
"show"
);



},2000);



};
// ==========================================
// ORDER HISTORY LOAD
// ==========================================


let adminOrders = [];





async function loadOrderHistory(){


try{


let snap = await getDocs(

collection(
db,
"orders"
)

);




adminOrders=[];



snap.forEach(doc=>{


adminOrders.push({

id:doc.id,

...doc.data()

});


});





displayOrders();



}

catch(error){


console.error(

"Order Load Error",

error

);


}



}









// ==========================================
// DISPLAY ORDERS
// ==========================================


function displayOrders(){



let box =

document.getElementById(

"orderHistoryList"

);



if(!box)return;



box.innerHTML="";






let search =

(

document.getElementById(

"orderSearch"

)?.value

|| ""

).toLowerCase();






let status =

document.getElementById(

"orderStatusFilter"

)?.value

|| "ALL";







let data =

adminOrders.filter(order=>{



let text =

(

order.customerName

+

order.tableNumber

+

order.id

)

.toLowerCase();






let matchSearch =

text.includes(search);






let matchStatus =

status==="ALL"

?

true

:

order.status===status;





return (

matchSearch

&&

matchStatus

);



});









if(data.length===0){


box.innerHTML=

`

<h3>

No Orders Found

</h3>

`;

return;


}









data.forEach(order=>{



let items="";





(order.items || [])

.forEach(item=>{



items += `


<div class="order-item">


<span>

${item.name}

</span>


<b>

x${item.qty}

</b>


</div>


`;



});








box.innerHTML += `


<div class="order-card">


<h3>

Order #${order.id.substring(0,6)}

</h3>



<p>

Customer:

${order.customerName || "-"}

</p>



<p>

Table:

${order.tableNumber || "-"}

</p>



<p>

Type:

${order.orderType || "-"}

</p>





${items}



<h4>

Status:

${order.status || "NEW"}

</h4>



</div>


`;



});




}









// ==========================================
// SEARCH EVENTS
// ==========================================


document.addEventListener(

"input",

(e)=>{


if(e.target.id==="orderSearch"){


displayOrders();


}


}

);








// ==========================================
// STATUS FILTER
// ==========================================


document.addEventListener(

"change",

(e)=>{


if(e.target.id==="orderStatusFilter"){


displayOrders();


}


}

);









// ==========================================
// START
// ==========================================


window.addEventListener(

"load",

()=>{


if(

localStorage.getItem(
"adminLogin"
)==="yes"

){


loadOrderHistory();


}


}

);
// ==========================================
// MENU LOAD
// ==========================================


let adminMenu=[];




async function loadAdminMenu(){



try{



let snap = await getDocs(

collection(

db,

"menus"

)

);




adminMenu=[];




snap.forEach(doc=>{


adminMenu.push({

id:doc.id,

...doc.data()

});


});





displayAdminMenu();





}

catch(error){


console.error(

"Menu Load Error",

error

);



}



}









// ==========================================
// DISPLAY MENU
// ==========================================


function displayAdminMenu(){



let box =

document.getElementById(

"adminMenuList"

);



if(!box)return;



box.innerHTML="";







adminMenu.forEach(item=>{





box.innerHTML += `



<div class="menu-row">


<div>

${item["Item Name"] || ""}

</div>



<div>

${item.category || ""}

</div>



<div>

RM ${Number(

item["Dine in price"] || 0

).toFixed(2)}

</div>



<div>

RM ${Number(

item["Take away Price"] || 0

).toFixed(2)}

</div>



</div>



`;




});



}









// ==========================================
// CSV UPLOAD
// ==========================================


window.uploadMenuCSV = async function(){



let file =

document.getElementById(

"csvFile"

).files[0];





if(!file){


showToast(

"Select CSV File"

);


return;


}







let text =

await file.text();







let rows =

text.split("\n");







let headers =

rows[0]

.split(",")

.map(x=>x.trim());









for(let i=1;i<rows.length;i++){



let values =

rows[i]

.split(",")

.map(x=>x.trim());







if(values.length<2)

continue;








let data={};





headers.forEach((h,index)=>{


data[h]=values[index] || "";


});








try{



await addDoc(

collection(

db,

"menus"

),

data

);



}

catch(error){


console.error(error);


}





}







showToast(

"Menu Uploaded"

);





loadAdminMenu();





};











// ==========================================
// INITIAL LOAD
// ==========================================


window.addEventListener(

"load",

()=>{



if(

localStorage.getItem(

"adminLogin"

)==="yes"

){


loadAdminMenu();


}



});
