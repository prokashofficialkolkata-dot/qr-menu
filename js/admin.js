// =====================================
// RESTORAN HAMEED'S BISTRO
// ADMIN JS FINAL V3
// =====================================


import { auth, db } from "./firebase.js";


import {

signInWithEmailAndPassword,
signOut

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


import {

collection,
getDocs,
addDoc,
doc,
updateDoc,
deleteDoc,
writeBatch,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





// =====================================
// ADMIN LOGIN
// =====================================


window.adminLogin = async function(){


try{


let email =
document.getElementById("adminEmail").value;



let password =
document.getElementById("adminPassword").value;



await signInWithEmailAndPassword(

auth,

email,

password

);





document.getElementById("loginBox").style.display="none";


document.getElementById("dashboard").style.display="block";



loadMenuAdmin();



}

catch(error){


document.getElementById("loginMessage").innerHTML =
error.message;


}



};








// =====================================
// LOGOUT
// =====================================


window.adminLogout=function(){


signOut(auth);


location.reload();


};









// =====================================
// LOAD MENU
// =====================================


async function loadMenuAdmin(){



let box =
document.getElementById("menuList");



if(!box)return;



box.innerHTML="";



const snap =

await getDocs(

collection(db,"menus")

);





snap.forEach((item)=>{


let data=item.data();



let div=document.createElement("div");


div.className="menuAdminCard";



div.innerHTML=`


<h3>
${data.name}
</h3>


<p>
Category:
${data.category}
</p>


<p>
Dine In:
RM ${Number(data.dineInPrice).toFixed(2)}
</p>


<p>
Take Away:
RM ${Number(data.takeAwayPrice).toFixed(2)}
</p>



<button onclick="editMenuItem('${item.id}')">

Edit

</button>



<button onclick="deleteMenuItem('${item.id}')">

Delete

</button>


<hr>


`;



box.appendChild(div);



});



}








// =====================================
// ADD MENU ITEM
// =====================================


window.addMenuItem = async function(){


let category =
document.getElementById("itemCategory").value;


let name =
document.getElementById("itemName").value;


let dine =
document.getElementById("itemDinePrice").value;


let takeaway =
document.getElementById("itemTakePrice").value;






await addDoc(

collection(db,"menus"),

{


category:category,


name:name,


dineInPrice:Number(dine),


takeAwayPrice:Number(takeaway),


createdAt:serverTimestamp()


}

);




alert("Menu Added");



loadMenuAdmin();


};









// =====================================
// EDIT MENU
// =====================================


window.editMenuItem = async function(id){



let name =
prompt("Item Name");



let category =
prompt("Category");



let dine =
prompt("Dine In Price");



let take =
prompt("Take Away Price");





await updateDoc(

doc(db,"menus",id),

{


name:name,


category:category,


dineInPrice:Number(dine),


takeAwayPrice:Number(take)



}

);




alert("Updated");


loadMenuAdmin();



};









// =====================================
// DELETE MENU
// =====================================


window.deleteMenuItem = async function(id){



let ok =
confirm(
"Delete this item?"
);



if(!ok)return;




await deleteDoc(

doc(db,"menus",id)

);





alert("Deleted");


loadMenuAdmin();



};









// =====================================
// CSV UPLOAD
// FORMAT:
// Category,Item Name,Dine in price,Take away Price
// =====================================


window.uploadCSV = async function(){



const file =

document
.getElementById("csvFile")
.files[0];





if(!file){

alert(
"Select CSV File"
);

return;

}







const text =

await file.text();





const rows =

text
.trim()
.split("\n");






const batch =

writeBatch(db);






for(let i=1;i<rows.length;i++){



let row =

rows[i]
.split(",");






let category =
row[0]?.trim() || "";



let name =
row[1]?.trim() || "";



let dine =
Number(row[2]) || 0;



let take =
Number(row[3]) || 0;






let ref =

doc(

collection(db,"menus")

);






batch.set(

ref,

{


category:category,


name:name,


dineInPrice:dine,


takeAwayPrice:take,


createdAt:serverTimestamp()


}

);



}





await batch.commit();






document.getElementById(

"uploadStatus"

).innerHTML =

"CSV Menu Updated Successfully";






loadMenuAdmin();



};






// =====================================
// AUTO LOAD
// =====================================


window.addEventListener(

"load",

()=>{


const dash =
document.getElementById("dashboard");


if(dash){

dash.style.display="none";

}



}

);
