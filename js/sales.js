
// =====================================
// SALES.JS FINAL V5
// Restoran Hameed's Bistro
// =====================================


import { db } from "./firebase.js";


import {

collection,

getDocs

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";











// =====================================
// LOAD SALES REPORT
// =====================================


window.loadSalesReport = async function(){



let totalBox=document.getElementById(

"salesTotal"

);



let todayBox=document.getElementById(

"todaySales"

);



let monthBox=document.getElementById(

"monthSales"

);



let topBox=document.getElementById(

"salesTopItems"

);



let catBox=document.getElementById(

"salesCategory"

);






let total=0;


let today=0;


let month=0;



let items={};



let categories={};







let now=new Date();









try{



const snap = await getDocs(

collection(db,"orders")

);







snap.forEach(order=>{



let data=order.data();






if(

data.status==="CANCELLED"

){

return;


}








let amount=Number(

data.total || 0

);






total += amount;








let date;



if(data.createdAt?.toDate){


date=data.createdAt.toDate();


}

else{


date=new Date();


}








if(

date.toDateString()

===

now.toDateString()

){



today += amount;



}








if(

date.getMonth()

===

now.getMonth()

&&

date.getFullYear()

===

now.getFullYear()

){



month += amount;



}








(data.items || [])

.forEach(item=>{






if(!items[item.name]){


items[item.name]=0;


}



items[item.name]+=Number(

item.qty || 0

);








let cat=item.category || "Others";





if(!categories[cat]){


categories[cat]=0;


}



categories[cat]+=Number(

item.qty || 0

);






});







});









// TOTAL


if(totalBox){



totalBox.innerHTML=

"RM "

+

total.toFixed(2);



}








// TODAY


if(todayBox){



todayBox.innerHTML=

"RM "

+

today.toFixed(2);



}








// MONTH


if(monthBox){



monthBox.innerHTML=

"RM "

+

month.toFixed(2);



}









// TOP ITEMS


if(topBox){



topBox.innerHTML="";




Object.entries(items)

.sort(

(a,b)=>b[1]-a[1]

)

.slice(0,50)

.forEach(x=>{



topBox.innerHTML += `



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








// CATEGORY


if(catBox){



catBox.innerHTML="";




Object.entries(categories)

.sort(

(a,b)=>b[1]-a[1]

)

.forEach(x=>{



catBox.innerHTML +=`



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

"SALES REPORT ERROR",

error

);



}



};











// AUTO LOAD

window.addEventListener(

"load",

()=>{


if(window.loadSalesReport){


loadSalesReport();


}



});
