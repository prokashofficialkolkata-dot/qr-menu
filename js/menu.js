// ==============================
// MAIN.JS
// ==============================


window.pageHistory = [];

window.currentPage = "welcome";


// Refresh
window.refreshPage = function(){

    location.reload();

};



// Start Menu

window.startMenu = function(type){

    window.selectedType = type;

    pageHistory.push("welcome");

    showPage("menuPage");

    loadCSV();

};




// Show Page

window.showPage = function(page){

    document.getElementById("welcome").style.display="none";

    document.getElementById("menuPage").style.display="none";

    document.getElementById("cartPage").style.display="none";

    document.getElementById("checkoutPage").style.display="none";


    let target=document.getElementById(page);


    if(target){

        target.style.display="block";

        currentPage=page;

    }

};




// Home

window.goHome=function(){

    pageHistory=[];

    showPage("welcome");

};





// Back

window.goBack=function(){

    let previous = pageHistory.pop();


    if(previous){

        showPage(previous);

    }

    else{

        goHome();

    }

};





// Open Login

window.openLogin=function(){

    showPage("checkoutPage");


    document.getElementById("loginBox").style.display="block";

    document.getElementById("createBox").style.display="none";

    document.getElementById("phoneBox").style.display="none";

    document.getElementById("checkoutForm").style.display="none";


};






// Cart Count

window.updateCartCount=function(){

    let count=0;


    if(window.cart){

        cart.forEach(item=>{

            count += item.qty;

        });

    }



    let a=document.getElementById("cartCount");

    let b=document.getElementById("cartCount2");


    if(a){

        a.innerHTML=count;

    }


    if(b){

        b.innerHTML=count;

    }


};





// Language

window.selectedLanguage="en";


window.setLanguage=function(lang){

    window.selectedLanguage=lang;


    console.log("Language:",lang);


    // পরে language.js connect হবে

};




// User Logout Button

window.showLogout=function(){

    let box=document.getElementById("logoutArea");


    if(box){

        box.innerHTML=`

        <button onclick="logoutUser()">

        Logout

        </button>

        `;

    }

};
