// =====================================
// MENU.JS FINAL
// RESTORAN HAMEED'S BISTRO
// =====================================


let menuData = [];

let currentView = "popular";

let selectedCategory = "";





// ================================
// LOAD CSV
// ================================


window.loadCSV=function(){



fetch("menu.csv")


.then(response=>response.text())


.then(data=>{



    let rows=data.split("\n");


    menuData=[];



    rows.slice(1).forEach(row=>{



        let col=row.split(",");



        if(col.length>=4){



            menuData.push({



                category:col[0].trim(),


                name:col[1].trim(),


                dine:col[2].trim(),


                takeaway:col[3].trim()



            });



        }



    });




    showPopularItems();



});



};








// ================================
// CATEGORY LOAD
// ================================


window.loadCategory=function(){



let box=document.getElementById(
"categoryBox"
);



if(!box)return;




box.innerHTML="";



let categories=[

...new Set(

menuData.map(item=>item.category)

)

];





categories.forEach(function(cat){



let btn=document.createElement("button");



btn.className="category-btn";



btn.innerHTML=cat;



btn.onclick=function(){



selectCategory(cat);



};



box.appendChild(btn);



});



};







// ================================
// SELECT CATEGORY
// ================================


window.selectCategory=function(category){



selectedCategory=category;



currentView="category";



let box=document.getElementById(
"categoryBox"
);



if(box){


box.style.display="none";


}




let popular=document.getElementById(
"popularSection"
);



if(popular){


popular.style.display="none";


}





showCategoryItems(category);



};








// ================================
// SHOW CATEGORY ITEMS
// ================================


window.showCategoryItems=function(category){



let itemBox=document.getElementById(
"itemBox"
);



if(!itemBox)return;



itemBox.innerHTML="";





let items=menuData.filter(function(item){



return item.category===category;



});





items.forEach(function(item){



createItemCard(item,itemBox);



});



};









// ================================
// POPULAR ITEMS
// ================================


window.showPopularItems=function(){



currentView="popular";




let itemBox=document.getElementById(
"itemBox"
);



if(itemBox){


itemBox.innerHTML="";


}




let popular=document.getElementById(
"popularSection"
);



if(popular){


popular.style.display="block";


}





let popularBox=document.getElementById(
"popularItems"
);



if(!popularBox)return;



popularBox.innerHTML="";




// Top 15 items

let popularItems=menuData.slice(0,15);




popularItems.forEach(function(item){



createPopularCard(item,popularBox);



});



};









// ================================
// RESTORE VIEW
// ================================


window.restoreMenuView=function(){



if(currentView==="category"){



showCategoryItems(
selectedCategory
);



}

else{



showPopularItems();



}



};









// ================================
// CREATE ITEM CARD
// ================================


function createItemCard(item,box){



let div=document.createElement("div");


div.className="menu-item";



let price = 
localStorage.getItem("orderType")
==="TAKE AWAY"
?
item.takeaway
:
item.dine;




div.innerHTML=`


<h3>${item.name}</h3>


<p>
RM ${price}
</p>


<button onclick="addToCart('${item.name}','${price}')">

ADD ITEM

</button>


`;



box.appendChild(div);



}









// ================================
// POPULAR CARD
// ================================


function createPopularCard(item,box){



let div=document.createElement("div");


div.className="popular-card";



let price =
item.dine;




div.innerHTML=`


<h3>⭐ ${item.name}</h3>


<p>
RM ${price}
</p>


<button onclick="addToCart('${item.name}','${price}')">

ADD ITEM

</button>


`;



box.appendChild(div);



}









// ================================
// ADD ITEM
// ================================


window.addToCart=function(name,price){



let cart =
JSON.parse(
localStorage.getItem("cart")
)
|| [];




cart.push({


name:name,


price:price


});




localStorage.setItem(

"cart",

JSON.stringify(cart)

);





if(typeof updateCartCount==="function"){


updateCartCount();


}





showToast(

"Hameed's Bistro says "+name+" Added"

);



};









// ================================
// AUTO LOAD
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){


if(
document.getElementById("menuPage")
){


loadCSV();


}



}

);
