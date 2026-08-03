// ==============================
// MENU.JS
// ==============================


window.menuData = [];

window.selectedType = "";




// ==============================
// START MENU
// ==============================


window.startMenu=function(type){


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



.then(response=>{


    if(!response.ok){

        throw new Error("CSV file not found");

    }


    return response.text();



})



.then(data=>{



    let rows=data.split(/\r?\n/);



    window.menuData=[];




    rows.slice(1).forEach(row=>{



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



})



.catch(error=>{


    console.log(
        "CSV ERROR:",
        error
    );


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




if(!categoryBox)return;




categoryBox.innerHTML="";

itemBox.innerHTML="";



let categories=[

...new Set(

window.menuData.map(
item=>item.category
)

)

];





categories.forEach(category=>{



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
// SHOW ITEMS
// ==============================


window.showItems=function(category){



let itemBox =
document.getElementById(
"itemBox"
);



itemBox.innerHTML="";



let items =

window.menuData.filter(

item=>

item.category==category

);





items.forEach(item=>{



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





// Top 15 temporary

let popularItems =

window.menuData.slice(0,15);





popularItems.forEach(item=>{



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

onerror="this.src='images/no-image.png'"

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
// ESCAPE SPECIAL CHARACTER
// ==============================


function escapeText(text){



return text

.replace(/'/g,"\\'")

.replace(/"/g,'\\"');



}
