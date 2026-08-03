// ==============================
// MAIN.JS
// ==============================


// PAGE HISTORY

window.pageHistory = [];

window.currentPage = "welcome";





// ==============================
// SHOW PAGE
// ==============================


window.showPage = function(page){


    window.currentPage = page;


    localStorage.setItem(
        "currentPage",
        page
    );



    let pages = [

        "welcome",

        "menuPage",

        "cartPage",

        "checkoutPage"

    ];



    pages.forEach(function(id){


        let el = document.getElementById(id);


        if(el){

            el.style.display = "none";

        }


    });




    let target =
    document.getElementById(page);



    if(target){

        target.style.display="block";

    }


};








// ==============================
// HOME BUTTON
// ==============================


window.goHome=function(){


    pageHistory=[];


    showPage("welcome");


};








// ==============================
// BACK BUTTON
// ==============================


window.goBack=function(){



    if(pageHistory.length > 0){


        let previous =
        pageHistory.pop();



        showPage(previous);


    }

    else{


        showPage("welcome");


    }



};








// ==============================
// REFRESH BUTTON
// ==============================


window.refreshPage=function(){



    let page =
    localStorage.getItem(
        "currentPage"
    );



    if(!page){

        page="welcome";

    }




    localStorage.setItem(
        "refreshPage",
        page
    );



    location.reload();



};








// ==============================
// RESTORE PAGE AFTER REFRESH
// ==============================


window.addEventListener(
"load",
function(){



let savedPage =
localStorage.getItem(
"refreshPage"
);



if(savedPage){


    showPage(savedPage);


}

else{


    showPage("welcome");


}



});








// ==============================
// LANGUAGE
// ==============================


window.selectedLanguage =
localStorage.getItem(
"language"
)
||
"en";




window.setLanguage=function(lang){



    window.selectedLanguage = lang;



    localStorage.setItem(
        "language",
        lang
    );



    console.log(
        "Language Changed:",
        lang
    );



};








// ==============================
// CART COUNT
// ==============================


window.updateCartCount=function(){



let count = 0;



if(
Array.isArray(window.cart)
){


count =
window.cart.length;


}




let cart1 =
document.getElementById(
"cartCount"
);


let cart2 =
document.getElementById(
"cartCount2"
);




if(cart1){

cart1.innerHTML=count;

}



if(cart2){

cart2.innerHTML=count;

}



};








// ==============================
// LOGIN DISPLAY
// ==============================



window.showLogout=function(){



let box =
document.getElementById(
"logoutArea"
);



if(!box)return;



box.innerHTML = `


<button onclick="logoutUser()">

Logout

</button>


`;



};








window.hideLogout=function(){



let box =
document.getElementById(
"logoutArea"
);



if(box){

box.innerHTML="";

}


};








// ==============================
// CHECK LOGIN STATUS
// ==============================


window.checkLogin=function(){



let user =
localStorage.getItem(
"customerEmail"
);



if(user){


showLogout();


}

else{


hideLogout();


}



};







// START

window.onload=function(){


checkLogin();



updateCartCount();



};
