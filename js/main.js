// ==============================
// MAIN.JS
// ==============================


window.pageHistory = [];

window.currentPage = "welcome";




// ==============================
// SHOW PAGE
// ==============================

window.showPage = function(page){


    document.querySelectorAll("body > div").forEach(function(div){

        if(
            div.id === "welcome" ||
            div.id === "menuPage" ||
            div.id === "cartPage" ||
            div.id === "checkoutPage"
        ){

            div.style.display="none";

        }

    });



    let target=document.getElementById(page);


    if(target){

        target.style.display="block";

        window.currentPage=page;

    }



};






// ==============================
// HOME
// ==============================

window.goHome=function(){


    pageHistory=[];


    showPage("welcome");


};







// ==============================
// BACK
// ==============================

window.goBack=function(){


    if(pageHistory.length>0){


        let lastPage =
        pageHistory.pop();


        showPage(lastPage);


    }
    else{


        showPage("welcome");


    }


};






// ==============================
// REFRESH
// ==============================

window.refreshPage=function(){


    location.reload();


};







// ==============================
// LANGUAGE
// ==============================

window.selectedLanguage="en";


window.setLanguage=function(lang){


    window.selectedLanguage=lang;


    localStorage.setItem(
        "language",
        lang
    );


    console.log(
        "Language:",
        lang
    );


};






// ==============================
// CART COUNT
// ==============================


window.updateCartCount=function(){


    let count=0;


    if(
        typeof cart !== "undefined"
    ){

        count=cart.length;

    }



    let boxes=[
        document.getElementById("cartCount"),
        document.getElementById("cartCount2")
    ];



    boxes.forEach(function(box){


        if(box){

            box.innerHTML=count;

        }


    });



};







// ==============================
// LOGIN / LOGOUT DISPLAY
// ==============================


window.showLogout=function(){


let area=document.getElementById("logoutArea");


if(!area)return;



area.innerHTML=`


<button onclick="logoutUser()">

Logout

</button>


`;



};





window.hideLogout=function(){


let area=document.getElementById("logoutArea");


if(area){

area.innerHTML="";

}


};







// LOAD SAVED LANGUAGE

let savedLanguage =
localStorage.getItem("language");


if(savedLanguage){

window.selectedLanguage=savedLanguage;

}
