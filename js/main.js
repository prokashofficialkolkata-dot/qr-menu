// ==============================
// MAIN.JS
// ==============================


// PAGE CONTROL

window.pageHistory = [];

window.currentPage = "welcome";





// ==============================
// SHOW PAGE
// ==============================


window.showPage=function(page){


    window.currentPage = page;


    localStorage.setItem(
        "currentPage",
        page
    );



    let pages=[

        "welcome",

        "menuPage",

        "cartPage",

        "checkoutPage"

    ];



    pages.forEach(function(id){


        let element =
        document.getElementById(id);



        if(element){

            element.style.display="none";

        }


    });



    let target =
    document.getElementById(page);



    if(target){

        target.style.display="block";

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



        let previous =
        pageHistory.pop();



        showPage(previous);



    }

    else{


        showPage("welcome");


    }


};







// ==============================
// REFRESH
// ==============================


window.refreshPage=function(){



    let page =
    window.currentPage
    ||
    localStorage.getItem(
    "currentPage"
    )
    ||
    "welcome";



    localStorage.setItem(
        "refreshPage",
        page
    );



    location.reload();



};








// ==============================
// RESTORE AFTER REFRESH
// ==============================


window.addEventListener(
"load",
function(){



    checkLogin();


    updateCartCount();



    let savedPage =
    localStorage.getItem(
    "refreshPage"
    );



    if(savedPage){



        showPage(savedPage);



        if(savedPage=="menuPage"){



            setTimeout(function(){



                if(
                typeof loadCSV === "function"
                ){


                    loadCSV();



                }



            },300);



        }



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



    window.selectedLanguage=lang;



    localStorage.setItem(
        "language",
        lang
    );



};








// ==============================
// CART COUNT
// ==============================


window.updateCartCount=function(){



let count=0;



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
// LOGIN LOGOUT
// ==============================


window.showLogout=function(){


let area =
document.getElementById(
"logoutArea"
);



if(!area)return;



area.innerHTML=`


<button onclick="logoutUser()">

Logout

</button>


`;



};







window.hideLogout=function(){



let area =
document.getElementById(
"logoutArea"
);



if(area){

area.innerHTML="";

}


};








// ==============================
// LOGIN CHECK
// ==============================


window.checkLogin=function(){



let email =
localStorage.getItem(
"customerEmail"
);



if(email){


showLogout();


}

else{


hideLogout();


}



};
