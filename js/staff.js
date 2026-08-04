// =====================================
// RESTORAN HAMEED'S BISTRO
// STAFF LOGIN SYSTEM V1
// =====================================


import {

auth,
db

} from "./firebase.js";



import {

signInWithEmailAndPassword

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";



import {

doc,
getDoc,
setDoc,
collection,
addDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";







// =====================================
// STAFF LOGIN
// =====================================


window.staffLogin = async function(){


try{


const email =
document
.getElementById("staffEmail")
.value
.trim();



const password =
document
.getElementById("staffPassword")
.value
.trim();





if(!email || !password){


showStaffMessage(
"Enter email and password"
);


return;


}






const result =

await signInWithEmailAndPassword(

auth,

email,

password

);





const user =
result.user;







// CHECK STAFF PROFILE


const staffRef =
doc(

db,

"staff",

user.uid

);





const staffSnap =
await getDoc(
staffRef
);






if(!staffSnap.exists()){


showStaffMessage(
"Staff account not found"
);



return;


}






const staffData =
staffSnap.data();








// SAVE LOGIN


localStorage.setItem(

"staffLogin",

"yes"

);



localStorage.setItem(

"staffUid",

user.uid

);





localStorage.setItem(

"staffName",

staffData.name || ""

);









// CREATE ATTENDANCE


await addDoc(

collection(

db,

"attendance"

),

{


staffId:user.uid,


staffName:

staffData.name || "",


loginTime:

serverTimestamp(),



status:

"Present"



}

);








showStaffMessage(

"Login Successful"

);





setTimeout(()=>{


window.location.href="cashier.html";


},1000);





}



catch(error){


console.log(
error
);



showStaffMessage(

error.message

);



}



};











// =====================================
// MESSAGE
// =====================================


function showStaffMessage(message){


const box =
document.getElementById(
"staffMessage"
);



if(box){

box.innerHTML =
message;

}



}



window.showStaffMessage =
showStaffMessage;
