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

        target.style.display = "block";

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


    if(pageHistory.length > 0){


        let last =
        pageHistory.pop();


        showPage(last);


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
window.currentPage || "welcome";



localStorage.setItem(
"refreshPage",
page
);



location.reload();



};








// ==============================
// AFTER REFRESH RESTORE
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


if(typeof loadCSV=="function"){


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
localStorage.getItem("language")
||
"en";




window.setLanguage=function(lang){



window.selectedLanguage = lang;



localStorage.setItem(
"language",
lang
);



};








// ==============================
// POPULAR BUTTON
// ==============================


window.showPopular=function(){



let categoryBox =
document.getElementById(
"categoryBox"
);



let itemBox =
document.getElementById(
"itemBox"
);



let popularSection =
document.getElementById(
"popularSection"
);





if(categoryBox){

categoryBox.style.display="none";

}



if(itemBox){

itemBox.innerHTML="";

}



if(popularSection){


popularSection.style.display="block";


}




if(typeof showPopularItems=="function"){


showPopularItems();


}



};








// ==============================
// CART COUNT
// ==============================


window.updateCartCount=function(){



let count=0;



if(Array.isArray(window.cart)){


count=window.cart.length;


}



let c1 =
document.getElementById(
"cartCount"
);


let c2 =
document.getElementById(
"cartCount2"
);



if(c1){

c1.innerHTML=count;

}



if(c2){

c2.innerHTML=count;

}



};








// ==============================
// LOGIN / LOGOUT
// ==============================


window.showLogout=function(){


let box =
document.getElementById(
"logoutArea"
);



if(!box)return;



box.innerHTML=`


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
