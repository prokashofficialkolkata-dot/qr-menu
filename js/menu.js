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
// LOAD CSV
// ==============================


window.loadCSV=function(){


fetch("menu.csv")


.then(response=>response.text())


.then(data=>{


    let rows=data.split(/\r?\n/);


    window.menuData=[];



    rows.slice(1).forEach(function(row){



        if(row.trim()=="") return;



        let col=row.split(",");



        if(col.length>=4){


            window.menuData.push({


                category:col[0].trim(),


                name:col[1].trim(),


                dine:col[2].trim(),


                takeaway:col[3].trim()


            });



        }



    });




    console.log(
        "Menu Loaded:",
        window.menuData.length
    );



    showPopularItems();



});



};







// ==============================
// OPEN CATEGORY
// ==============================


window.openCategory=function(){



let categoryBox =
document.getElementById(
"categoryBox"
);



let itemBox =
document.getElementById(
"itemBox"
);




let popular =
document.getElementById(
"popularSection"
);





if(categoryBox){


    categoryBox.style.display="block";


    categoryBox.innerHTML="";


}



if(itemBox){


    itemBox.innerHTML="";


}



if(popular){


    popular.style.display="none";


}





let categories=[

...new Set(

window.menuData.map(function(item){

return item.category;

})

)

];





categories.forEach(function(category){



categoryBox.innerHTML += `


<button

class="category"


onclick="showItems('${escapeText(category)}')">


${category}


</button>


`;



});



};







// ==============================
// SHOW ITEMS BY CATEGORY
// ==============================


window.showItems=function(category){



let categoryBox =
document.getElementById(
"categoryBox"
);



let itemBox =
document.getElementById(
"itemBox"
);





// Hide category list

if(categoryBox){


categoryBox.style.display="none";


}




itemBox.innerHTML="";





let items = window.menuData.filter(function(item){



return item.category === category;



});







items.forEach(function(item){



let price =

(window.selectedType=="DINE IN")

?

item.dine

:

item.takeaway;






itemBox.innerHTML += `



<div class="item">



<div>


<b>${item.name}</b>


<br>


<span>${price}</span>


</div>




<button

onclick="addCart('${escapeText(item.name)}','${price}')">


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



let box =
document.getElementById(
"popularItems"
);



if(!box)return;



box.innerHTML="";





let popular =

window.menuData.slice(0,15);






popular.forEach(function(item){



let price =

(window.selectedType=="DINE IN")

?

item.dine

:

item.takeaway;





box.innerHTML += `



<div class="popular-card">



<img

src="images/${item.name}.jpg"

onerror="this.style.display='none'"

>



<b>

${item.name}

</b>



<p>

${price}

</p>




<button

onclick="addCart('${escapeText(item.name)}','${price}')">


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
