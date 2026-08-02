let currentLanguage = "en";

let menuData = [];


fetch("menu.csv")
.then(response=>response.text())
.then(data=>{

    let rows=data.split("\n");

    rows.shift();

    rows.forEach(row=>{

        let col=row.split(",");

        if(col.length>=3){

            menuData.push({

                category:col[0].trim(),

                name:col[1].trim(),

                price:col[2].trim()

            });

        }

    });


    showMenu();

});



function showMenu(){

let menu=document.getElementById("menu");

menu.innerHTML="";


let categories={};


menuData.forEach(item=>{

if(!categories[item.category]){
categories[item.category]=[];
}

categories[item.category].push(item);

});



for(let cat in categories){

let html=`<h2 class="category-title">${cat}</h2>`;


categories[cat].forEach(item=>{


html+=`

<div class="item">

<div class="item-name">
${item.name}
</div>

<div class="price">
${item.price}
</div>

</div>

`;

});


menu.innerHTML+=html;


}


}



function changeLanguage(lang){

currentLanguage=lang;

alert("Language Changed: "+lang);

// Translation system next step এ যোগ হবে

}
