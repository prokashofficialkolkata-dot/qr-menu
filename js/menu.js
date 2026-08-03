// ==============================
// MENU.JS
// ==============================


window.menuData = [];

window.selectedType = "";





// ==============================
// START MENU
// ==============================

window.startMenu = function(type){


    window.selectedType = type;


    if(typeof pageHistory !== "undefined"){

        pageHistory.push("welcome");

    }



    showPage("menuPage");


    loadCSV();


};







// ==============================
// LOAD MENU CSV
// ==============================

window.loadCSV=function(){


fetch("menu.csv")


.then(response=>response.text())


.then(data=>{


    let rows=data.split("\n");


    window.menuData=[];



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







// ==============================
// OPEN CATEGORY
// ==============================

window.openCategory=function(){


let box=document.getElementById("categoryBox");

let itemBox=document.getElementById("itemBox");



if(!box)return;



box.innerHTML="";

itemBox.innerHTML="";



document.getElementById("popularSection").style.display="none";



let categories=[

...new Set(

menuData.map(item=>item.category)

)

];




categories.forEach(category=>{


box.innerHTML += `


<button onclick="showItems('${escapeText(category)}')">

${category}

</button>


`;


});



};







// ==============================
// SHOW ITEMS
// ==============================

window.showItems=function(category){



let box=document.getElementById("itemBox");



box.innerHTML="";



let list =
menuData.filter(
item=>item.category===category
);




list.forEach(item=>{


let price =

(selectedType==="DINE IN")

?

item.dine

:

item.takeaway;





box.innerHTML += `


<div class="item">


<div>

<b>${item.name}</b>

<br>

<span>${price}</span>


</div>



<button onclick="addCart('${escapeText(item.name)}','${price}')">

ADD

</button>


</div>


`;



});


};







// ==============================
// POPULAR ITEMS
// ==============================

window.showPopularItems=function(){



let box=document.getElementById("popularItems");



if(!box)return;



box.innerHTML="";





let popular =
menuData.slice(0,15);




popular.forEach(item=>{


let price =

(selectedType==="DINE IN")

?

item.dine

:

item.takeaway;




box.innerHTML += `


<div class="popular-card">


<img 
src="images/${item.name}.jpg"
onerror="this.src='images/no-image.png'"
>


<b>

${item.name}

</b>



<p>

${price}

</p>



<button onclick="addCart('${escapeText(item.name)}','${price}')">

ADD

</button>



</div>


`;



});


};








// ==============================
// ESCAPE TEXT
// ==============================

function escapeText(text){


return text
.replace(/'/g,"\\'")
.replace(/"/g,'\\"');


}
