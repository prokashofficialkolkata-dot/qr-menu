// ==========================================
// RESTORAN HAMEED'S BISTRO
// STAFF MANAGEMENT V2
// PART 1
// ==========================================


import { auth, db } from "./firebase.js";


import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

collection,

addDoc,

getDocs,

doc,

setDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";









// ==========================================
// STAFF LOGIN
// ==========================================


window.staffLogin = async function(){



let email =

document.getElementById(

"staffEmail"

).value;




let password =

document.getElementById(

"staffPassword"

).value;






let msg =

document.getElementById(

"staffMessage"

);






try{



let result =

await signInWithEmailAndPassword(

auth,

email,

password

);






localStorage.setItem(

"staffLogin",

"yes"

);





localStorage.setItem(

"staffUID",

result.user.uid

);






if(msg){


msg.innerHTML=

"Login Successful";


}




location.href="kitchen.html";





}

catch(error){



console.error(error);



if(msg){


msg.innerHTML=

"Login Failed";


}



}



};









// ==========================================
// CREATE STAFF
// ==========================================


window.createStaff = async function(){



let name =

document.getElementById(

"staffName"

).value;




let email =

document.getElementById(

"staffEmail"

).value;




let password =

document.getElementById(

"staffPassword"

).value;







try{



let user =

await createUserWithEmailAndPassword(

auth,

email,

password

);







await setDoc(

doc(

db,

"staff",

user.user.uid

),

{


name:name,

email:email,

role:"STAFF",

createdAt:new Date()


}

);






showToast(

"Staff Created"

);






loadStaff();





}

catch(error){



console.error(error);



showToast(

error.message

);



}



};
// ==========================================
// LOAD STAFF LIST
// ==========================================


async function loadStaff(){


let box =

document.getElementById(

"staffList"

);



if(!box)return;





try{



let snap = await getDocs(

collection(

db,

"staff"

)

);





box.innerHTML="";







snap.forEach(item=>{



let data = item.data();







box.innerHTML += `



<div class="staff-card">


<div>


<h3>

${data.name || "Staff"}

</h3>



<p>

${data.email || ""}

</p>



<p>

Role:

${data.role || "STAFF"}

</p>


</div>



<div>


<button

onclick="deleteStaff('${item.id}')">

Delete

</button>


</div>



</div>



`;



});





}

catch(error){



console.error(

"Staff Load Error",

error

);



}




}









// ==========================================
// OPEN CREATE STAFF BOX
// ==========================================


window.openStaffCreate=function(){



let box =

document.getElementById(

"staffCreateBox"

);



if(box){


box.style.display="block";


}



};









// ==========================================
// DELETE STAFF
// ==========================================


window.deleteStaff = async function(id){



try{



await deleteDoc(

doc(

db,

"staff",

id

)

);





showToast(

"Staff Removed"

);





loadStaff();





}

catch(error){



console.error(error);



}




};









// ==========================================
// STAFF PAGE LOAD
// ==========================================


window.addEventListener(

"load",

()=>{


if(

localStorage.getItem(

"adminLogin"

)==="yes"

){



loadStaff();



}



});
