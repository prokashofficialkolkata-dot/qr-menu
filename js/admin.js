
// =====================================
// ADMIN.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================


import { auth, db } from "./firebase.js";



import {


signInWithEmailAndPassword,


signOut


}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {


collection,


getDocs,


addDoc,


deleteDoc,


doc,


setDoc


}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









let adminUser = null;








// =====================================
// ADMIN LOGIN
// =====================================


window.adminLogin = async function(){



let email=document.getElementById(

"adminEmail"

).value;




let password=document.getElementById(

"adminPassword"

).value;






try{



let result = await signInWithEmailAndPassword(

auth,

email,

password

);





adminUser=result.user;






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

"Admin Login Success"

);





loadDashboard();



}

catch(error){



console.error(error);



document.getElementById(

"adminMessage"

).innerHTML=

"Login Failed";



}



};









// =====================================
// ADMIN LOGOUT
// =====================================


window.adminLogout=function(){



signOut(auth);



localStorage.removeItem(

"adminLogin"

);




location.reload();



};











// =====================================
// DASHBOARD LOAD
// =====================================


async function loadDashboard(){



loadOrders();



loadSales();



loadMenuList();



loadStaff();



}









// =====================================
// SHOW SECTION
// =====================================


window.openAdminSection=function(id){



let sections=[


"orderHistorySection",


"salesReportSection",


"menuUpdateSection",


"staffManagementSection"



];





sections.forEach(x=>{



let el=document.getElementById(x);



if(el){


el.style.display="none";


}



});







let target=document.getElementById(id);



if(target){


target.style.display="block";


}



};

// =====================================
// ORDER HISTORY
// =====================================


async function loadOrders(){



let box=document.getElementById(

"orderHistoryTable"

);



if(!box)return;





box.innerHTML="";





try{



const snap = await getDocs(

collection(db,"orders")

);





snap.forEach(item=>{



let d=item.data();





box.innerHTML += `



<tr>



<td>

${d.customerName || ""}

</td>



<td>

${d.phone || ""}

</td>



<td>

${d.tableNumber || ""}

</td>




<td>

${d.orderType || ""}

</td>




<td>

RM ${(d.total || 0).toFixed(2)}

</td>




<td>

${d.status || "NEW"}

</td>




</tr>



`;



});






}

catch(error){


console.error(

"ORDER LOAD ERROR",

error

);


}



}









// =====================================
// SALES REPORT
// =====================================


async function loadSales(){



let totalBox=document.getElementById(

"totalSales"

);



let itemBox=document.getElementById(

"topItemsTable"

);



let categoryBox=document.getElementById(

"categorySalesTable"

);






let totalSales=0;


let items={};


let categories={};









try{



const snap = await getDocs(

collection(db,"orders")

);







snap.forEach(order=>{



let data=order.data();






let total = Number(

data.total || 0

);



totalSales += total;








if(data.items){



data.items.forEach(item=>{



// TOP ITEMS


if(!items[item.name]){


items[item.name]=0;


}



items[item.name]+=Number(

item.qty || 0

);






// CATEGORY

let cat=item.category || "Others";



if(!categories[cat]){


categories[cat]=0;


}



categories[cat]+=

Number(item.qty || 0);





});



}





});








// TOTAL SALES


if(totalBox){


totalBox.innerHTML =

"RM "

+

totalSales.toFixed(2);


}









// TOP 50


if(itemBox){



itemBox.innerHTML="";



Object.entries(items)

.sort(

(a,b)=>b[1]-a[1]

)

.slice(0,50)

.forEach(x=>{



itemBox.innerHTML +=`



<tr>


<td>

${x[0]}

</td>


<td>

${x[1]}

</td>


</tr>



`;



});



}









// CATEGORY SALES


if(categoryBox){



categoryBox.innerHTML="";



Object.entries(categories)

.sort(

(a,b)=>b[1]-a[1]

)

.forEach(x=>{



categoryBox.innerHTML +=`



<tr>


<td>

${x[0]}

</td>


<td>

${x[1]}

</td>


</tr>



`;



});



}






}

catch(error){



console.error(

"SALES ERROR",

error

);



}



}

// =====================================
// LOAD MENU LIST
// =====================================


async function loadMenuList(){



let box=document.getElementById(

"menuUpdateTable"

);



if(!box)return;





box.innerHTML="";






try{



const snap = await getDocs(

collection(db,"menus")

);






snap.forEach(item=>{



let d=item.data();





box.innerHTML += `



<tr>



<td>

${d.category || ""}

</td>




<td>

${d["Item Name"] || d.itemName || ""}

</td>




<td>

RM ${Number(

d["Dine in price"] || 0

).toFixed(2)}

</td>




<td>

RM ${Number(

d["Take away Price"] || 0

).toFixed(2)}

</td>




<td>



<button

class="delete-btn"

onclick="deleteMenu('${item.id}')">


DELETE


</button>



</td>



</tr>



`;



});






}

catch(error){



console.error(

"MENU LOAD ERROR",

error

);



}



}











// =====================================
// DELETE MENU ITEM
// =====================================


window.deleteMenu = async function(id){



if(!confirm(

"Delete this item?"

)){


return;


}






try{



await deleteDoc(

doc(

db,

"menus",

id

)

);





showToast(

"Menu Deleted"

);





loadMenuList();



}

catch(error){



console.error(error);



}



};











// =====================================
// ADD SINGLE MENU ITEM
// =====================================


window.addMenuItem = async function(){



let category=document.getElementById(

"menuCategory"

).value;



let name=document.getElementById(

"menuName"

).value;



let dine=document.getElementById(

"menuDinePrice"

).value;



let takeaway=document.getElementById(

"menuTakePrice"

).value;







if(!name){



showToast(

"Enter Item Name"

);



return;


}






try{



await addDoc(

collection(db,"menus"),

{



category:category,



"Item Name":name,



"Dine in price":Number(dine),



"Take away Price":Number(takeaway),



sold:0



}



);






showToast(

"Menu Added"

);






loadMenuList();




}

catch(error){



console.error(error);



}



};











// =====================================
// CSV UPLOAD
// =====================================


window.uploadCSV = async function(event){



let file = event.target.files[0];




if(!file){


return;


}






let text = await file.text();





let rows=text.split("\n");





let headers=rows[0]

.split(",")

.map(x=>x.trim());








for(let i=1;i<rows.length;i++){



let data=rows[i].split(",");





if(data.length<4)continue;






let item={





category:data[0],





"Item Name":data[1],





"Dine in price":

Number(data[2] || 0),





"Take away Price":

Number(data[3] || 0),





sold:0





};







await addDoc(

collection(db,"menus"),

item

);






}






showToast(

"CSV Upload Complete"

);





loadMenuList();



};

// =====================================
// STAFF MANAGEMENT
// =====================================


async function loadStaff(){



let box=document.getElementById(

"staffTable"

);



if(!box)return;





box.innerHTML="";






try{



const snap = await getDocs(

collection(db,"staff")

);







snap.forEach(item=>{



let d=item.data();






box.innerHTML += `



<tr>



<td>

${d.name || ""}

</td>



<td>

${d.email || ""}

</td>



<td>

${d.phone || ""}

</td>




<td>

${d.role || "staff"}

</td>




<td>



<button

class="delete-btn"

onclick="deleteStaff('${item.id}')">


DELETE


</button>



</td>



</tr>



`;



});






}

catch(error){



console.error(

"STAFF LOAD ERROR",

error

);



}



}









// =====================================
// ADD STAFF
// =====================================


window.addStaff = async function(){



let name=document.getElementById(

"staffName"

).value;



let email=document.getElementById(

"staffEmail"

).value;



let phone=document.getElementById(

"staffPhone"

).value;



let role=document.getElementById(

"staffRole"

).value;






if(!name || !email){



showToast(

"Enter Staff Details"

);



return;


}







try{



await addDoc(

collection(db,"staff"),

{


name:name,


email:email,


phone:phone,


role:role || "staff",


createdAt:new Date()


}



);






showToast(

"Staff Added"

);





loadStaff();



}

catch(error){



console.error(error);



}



};











// =====================================
// DELETE STAFF
// =====================================


window.deleteStaff = async function(id){



if(!confirm(

"Delete Staff?"

)){


return;


}






try{



await deleteDoc(

doc(

db,

"staff",

id

)

);






showToast(

"Staff Deleted"

);





loadStaff();





}

catch(error){



console.error(error);



}



};











// =====================================
// REFRESH ADMIN DATA
// =====================================


window.refreshAdmin=function(){



loadOrders();


loadSales();


loadMenuList();


loadStaff();



showToast(

"Updated"

);



};











// =====================================
// TOAST
// =====================================


window.showToast = function(message){



let box=document.getElementById(

"toast"

);



if(!box){



box=document.createElement(

"div"

);



box.id="toast";



document.body.appendChild(box);



}





box.innerHTML=message;



box.classList.add(

"show"

);





setTimeout(()=>{



box.classList.remove(

"show"

);



},2000);



};
