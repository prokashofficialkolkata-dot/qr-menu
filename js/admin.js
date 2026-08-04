// =====================================
// RESTORAN HAMEED'S BISTRO
// ADMIN.JS V2 FINAL
// PART 1
// =====================================



// FIREBASE

import {

auth,
db

} from "./firebase.js";





// AUTH

import {

signInWithEmailAndPassword,
signOut,
onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";





// FIRESTORE

import {

collection,
getDocs,
doc,
updateDoc,
deleteDoc,
setDoc,
getDoc,
serverTimestamp,
query,
orderBy

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";








// =====================================
// ADMIN LOGIN
// =====================================


window.adminLogin = async function(){


try{


const email =
document
.getElementById("adminEmail")
.value
.trim();



const password =
document
.getElementById("adminPassword")
.value
.trim();





if(!email || !password){


showAdminMessage(
"Enter Email and Password"
);


return;

}





await signInWithEmailAndPassword(

auth,

email,

password

);





document
.getElementById("loginBox")
.style.display="none";




document
.getElementById("dashboard")
.style.display="block";





showAdminMessage(
"Login Successful"
);





loadOrders();

loadMenu();



}



catch(error){


console.log(
error
);



showAdminMessage(
error.message
);



}


};










// =====================================
// ADMIN LOGOUT
// =====================================


window.adminLogout = async function(){


try{


await signOut(auth);




document
.getElementById("dashboard")
.style.display="none";



document
.getElementById("loginBox")
.style.display="block";



showAdminMessage(
"Logout Successful"
);



}



catch(error){


console.log(error);


}



};










// =====================================
// AUTH CHECK
// =====================================


onAuthStateChanged(

auth,

(user)=>{


if(user){



document
.getElementById("loginBox")
.style.display="none";



document
.getElementById("dashboard")
.style.display="block";



loadOrders();

loadMenu();



}

else{



document
.getElementById("loginBox")
.style.display="block";



document
.getElementById("dashboard")
.style.display="none";



}



}

);










// =====================================
// MESSAGE
// =====================================


window.showAdminMessage=function(message){


let box =
document.getElementById(
"loginMessage"
);



if(box){

box.innerHTML =
message;

}



};
// =====================================
// LOAD ORDERS
// =====================================


window.loadOrders = async function(){


try{


const ordersBox =
document.getElementById(
"ordersList"
);



if(!ordersBox)return;



ordersBox.innerHTML =
"Loading Orders...";





const q = query(

collection(
db,
"orders"
),

orderBy(
"createdAt",
"desc"
)

);





const snapshot =
await getDocs(q);




ordersBox.innerHTML="";






if(snapshot.empty){


ordersBox.innerHTML =
"No Orders Found";


return;


}





snapshot.forEach((item)=>{



const order =
item.data();




const div =
document.createElement(
"div"
);



div.className =
"orderCard";





div.innerHTML = `


<h3>
Order ID:
${item.id}
</h3>



<p>
Customer:
${order.customerName || ""}
</p>



<p>
Phone:
${order.phone || ""}
</p>



<p>
Order Type:
${order.orderType || ""}
</p>



<p>
Items:
</p>



<p>
${JSON.stringify(order.items || [])}
</p>



<p>
Total:
RM ${Number(order.totalAmount || 0).toFixed(2)}
</p>



<p>
Status:
<b>
${order.status || "Pending"}
</b>
</p>





<button onclick="updateOrderStatus('${item.id}','Preparing')">

Preparing

</button>



<button onclick="updateOrderStatus('${item.id}','Ready')">

Ready

</button>



<button onclick="updateOrderStatus('${item.id}','Completed')">

Completed

</button>



`;




ordersBox.appendChild(div);



});




}



catch(error){


console.log(
"Orders Load Error:",
error
);



showAdminMessage(
error.message
);



}



};











// =====================================
// UPDATE ORDER STATUS
// =====================================


window.updateOrderStatus = async function(
orderId,
status
){


try{


await updateDoc(

doc(
db,
"orders",
orderId
),

{

status:status,

updatedAt:
serverTimestamp()

}

);





showAdminMessage(
"Order Status Updated"
);





loadOrders();




}



catch(error){


console.log(
error
);



showAdminMessage(
error.message
);



}



};
// =====================================
// MENU CSV UPLOAD
// =====================================


window.uploadMenuCSV = async function(){


try{


const fileInput =
document.getElementById(
"csvFile"
);



const file =
fileInput.files[0];



if(!file){


showAdminMessage(
"Please select CSV file"
);


return;


}





const text =
await file.text();





const rows =
text
.split("\n")
.map(row=>row.trim())
.filter(row=>row);





// HEADER REMOVE

const headers =
rows[0]
.split(",");



const dataRows =
rows.slice(1);





let count=0;





for(let row of dataRows){



const values =
row.split(",");




const menuId =
values[0]
||
Date.now().toString();





await setDoc(

doc(
db,
"menus",
menuId
),

{


id:menuId,


name:
values[1] || "",


category:
values[2] || "",


price:
Number(values[3]) || 0,


image:
values[4] || "",


popular:
values[5] || "no",



updatedAt:
serverTimestamp()



}



);



count++;



}






document.getElementById(
"uploadStatus"
).innerHTML =
count +
" Menu Uploaded Successfully";





loadMenu();




}



catch(error){


console.log(
"CSV Upload Error:",
error
);



showAdminMessage(
error.message
);



}



};
// =====================================
// LOAD MENU FROM FIRESTORE
// =====================================


window.loadMenu = async function(){


try{


const box =
document.getElementById(
"menuList"
);



if(!box)return;



box.innerHTML =
"Loading Menu...";





const snapshot =
await getDocs(

collection(
db,
"menus"
)

);





box.innerHTML="";





if(snapshot.empty){


box.innerHTML =
"No Menu Found";


return;


}





snapshot.forEach((item)=>{



const menu =
item.data();




const div =
document.createElement(
"div"
);



div.className =
"menuCard";





div.innerHTML = `


<h3>
${menu.name}
</h3>


<p>
Category:
${menu.category}
</p>


<p>
Price:
RM ${Number(menu.price).toFixed(2)}
</p>


<p>
Popular:
${menu.popular}
</p>




<button onclick="editMenu('${item.id}')">

Edit

</button>



<button onclick="deleteMenu('${item.id}')">

Delete

</button>



`;




box.appendChild(div);



});





}



catch(error){


console.log(
"Menu Load Error:",
error
);



showAdminMessage(
error.message
);



}



};











// =====================================
// DELETE MENU
// =====================================


window.deleteMenu = async function(id){



try{


const confirmDelete =
confirm(
"Delete this item?"
);



if(!confirmDelete)return;





await deleteDoc(

doc(
db,
"menus",
id
)

);





showAdminMessage(
"Menu Deleted"
);



loadMenu();



}



catch(error){


console.log(error);


showAdminMessage(
error.message
);



}



};











// =====================================
// EDIT MENU (START)
// =====================================


window.editMenu = async function(id){



const ref =
doc(
db,
"menus",
id
);



const snap =
await getDoc(ref);





if(!snap.exists()){


return;


}





const data =
snap.data();





document.getElementById(
"menuName"
).value =
data.name || "";



document.getElementById(
"menuCategory"
).value =
data.category || "";



document.getElementById(
"menuPrice"
).value =
data.price || "";



document.getElementById(
"menuImage"
).value =
data.image || "";



document.getElementById(
"menuPopular"
).value =
data.popular || "no";





localStorage.setItem(
"editMenuId",
id
);





showAdminMessage(
"Edit Mode"
);



};
// =====================================
// ADD / UPDATE MENU ITEM
// =====================================


window.addMenuItem = async function(){


try{


const name =
document
.getElementById("menuName")
.value
.trim();



const category =
document
.getElementById("menuCategory")
.value
.trim();



const price =
Number(
document
.getElementById("menuPrice")
.value
);



const image =
document
.getElementById("menuImage")
.value
.trim();



const popular =
document
.getElementById("menuPopular")
.value;





if(!name || !category || !price){


showAdminMessage(
"Please fill menu details"
);



return;


}







const editId =
localStorage.getItem(
"editMenuId"
);







if(editId){


// UPDATE EXISTING ITEM


await updateDoc(

doc(
db,
"menus",
editId
),

{

name:name,

category:category,

price:price,

image:image,

popular:popular,

updatedAt:
serverTimestamp()

}

);



localStorage.removeItem(
"editMenuId"
);



showAdminMessage(
"Menu Updated"
);



}

else{


// CREATE NEW ITEM


const id =
Date.now()
.toString();





await setDoc(

doc(
db,
"menus",
id
),

{

id:id,

name:name,

category:category,

price:price,

image:image,

popular:popular,

createdAt:
serverTimestamp()

}

);





showAdminMessage(
"Menu Added"
);



}





// CLEAR FORM


document.getElementById(
"menuName"
).value="";


document.getElementById(
"menuCategory"
).value="";


document.getElementById(
"menuPrice"
).value="";


document.getElementById(
"menuImage"
).value="";




loadMenu();



}



catch(error){


console.log(
error
);



showAdminMessage(
error.message
);



}



};









// =====================================
// SALES REPORT
// =====================================


window.loadSales = async function(){


try{


const box =
document.getElementById(
"salesReport"
);



if(!box)return;




const snap =
await getDocs(

collection(
db,
"orders"
)

);





let total=0;

let count=0;





snap.forEach((item)=>{


const data =
item.data();



total +=
Number(
data.totalAmount || 0
);



count++;



});





box.innerHTML = `


<h3>
Total Orders:
${count}
</h3>


<h3>
Total Sales:
RM ${total.toFixed(2)}
</h3>


`;




}



catch(error){


console.log(error);



}



};









// =====================================
// ORDER HISTORY
// =====================================


window.loadHistory = async function(){



try{


const box =
document.getElementById(
"historyList"
);



if(!box)return;



box.innerHTML =
"Loading...";





const snap =
await getDocs(

collection(
db,
"orders"
)

);





box.innerHTML="";





snap.forEach((item)=>{


const order =
item.data();




const div =
document.createElement(
"div"
);



div.className =
"orderCard";



div.innerHTML = `

<p>
${order.customerName || ""}
</p>


<p>
RM ${Number(order.totalAmount || 0).toFixed(2)}
</p>


<p>
${order.status || ""}
</p>

`;



box.appendChild(div);



});



}



catch(error){


console.log(error);


}



};
