// =====================================
// HAMEED BISTRO
// CUSTOMER MENU JS V4 FINAL
// =====================================


import {

db

} from "./firebase.js";


import {

collection,
getDocs,
query,
orderBy,
limit

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";





let allMenu = [];

let currentType = "dine";









// =====================================
// LOAD MENU
// =====================================


async function loadMenu(){



const snap =

await getDocs(

collection(
db,
"menus"
)

);





allMenu=[];



snap.forEach((item)=>{


allMenu.push({

id:item.id,

...item.data()

});



});





createCategories();


showPopular();


}





// =====================================
// CREATE CATEGORY BUTTON
// =====================================


function createCategories(){



const box =

document.getElementById(
"categoryList"
);



if(!box)return;



box.innerHTML="";





let categories =

[

...new Set(

allMenu.map(

x=>x.category

)

)

];







categories.forEach(cat=>{


let btn =

document.createElement(
"button"
);



btn.innerHTML = cat;



btn.onclick = ()=>{


openCategory(cat);


};



box.appendChild(btn);



});



}









// =====================================
// OPEN CATEGORY
// =====================================


window.openCategory=function(category){



let items =

allMenu.filter(

x=>x.category===category

);




showItems(items);



};









// =====================================
// SHOW ITEMS
// =====================================


function showItems(items){



const box =

document.getElementById(
"menuItems"
);



if(!box)return;



box.innerHTML="";





items.forEach(item=>{



let price =

currentType==="dine"

?

item.dineInPrice

:

item.takeAwayPrice;






let div =

document.createElement(
"div"
);



div.className="menuCard";




div.innerHTML = `


<h3>

${item.name}

</h3>



<p>

RM ${Number(price).toFixed(2)}

</p>



`;




box.appendChild(div);



});




}









// =====================================
// POPULAR TOP 15
// =====================================


async function showPopular(){



const box =

document.getElementById(
"popularItems"
);



if(!box)return;




const q =

query(

collection(
db,
"sales"
),

orderBy(

"qty",

"desc"

),

limit(15)

);







try{


const snap =

await getDocs(q);



box.innerHTML="";





snap.forEach(item=>{


let data=item.data();




let div =
document.createElement(
"div"
);



div.className="menuCard";



div.innerHTML=`


<h3>

${data.name}

</h3>


<p>

Sold:
${data.qty}

</p>



`;



box.appendChild(div);



});




}

catch(error){


console.log(

"Popular error",

error

);



}



}









// =====================================
// DINE / TAKE AWAY SWITCH
// =====================================


window.changeMenuType=function(type){



currentType=type;



showItems(allMenu);



};











// START


window.addEventListener(

"load",

()=>{


loadMenu();


}

);
