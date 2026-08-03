// =====================================
// RESTORAN HAMEED'S BISTRO
// MAIN.JS FINAL
// =====================================


let currentPage = "welcome";

let historyPage = [];




// ================================
// SHOW PAGE
// ================================

window.showPage = function(page){


    const pages = [
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



    let target = document.getElementById(page);



    if(target){

        target.style.display = "block";

    }


    currentPage = page;


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


};







// ================================
// HOME BUTTON
// ================================

window.goHome = function(){


    historyPage=[];


    showPage("welcome");


};







// ================================
// BACK BUTTON
// ================================

window.goBack = function(){


    if(historyPage.length > 0){


        let oldPage = historyPage.pop();


        showPage(oldPage);


    }

    else{


        showPage("welcome");


    }


};







// ================================
// START MENU
// ================================

window.startMenu = function(type){



    localStorage.setItem(
        "orderType",
        type
    );



    historyPage.push(currentPage);



    showPage("menuPage");



    // default view

    if(typeof loadCSV === "function"){


        loadCSV();


    }



};







// ================================
// REFRESH
// SAME PAGE KEEP
// ================================


window.refreshPage=function(){



    let stayPage=currentPage;



    showPage(stayPage);



    if(stayPage==="menuPage"){


        if(typeof loadCSV==="function"){


            loadCSV();


        }


    }




    if(stayPage==="cartPage"){


        if(typeof displayCart==="function"){


            displayCart();


        }


    }



    showToast(
        "Hameed's Bistro Refresh"
    );



};







// ================================
// SELECT CATEGORY BUTTON
// ================================


window.openCategory=function(){



    let box=document.getElementById(
        "categoryBox"
    );



    if(!box) return;




    if(box.style.display==="flex"){



        // close category

        box.style.display="none";



        // restore previous view

        if(typeof restoreMenuView==="function"){


            restoreMenuView();


        }



    }

    else{



        box.style.display="flex";



        if(typeof loadCategory==="function"){


            loadCategory();


        }



    }



};







// ================================
// POPULAR BUTTON
// ================================


window.showPopular=function(){



    if(currentPage!=="menuPage"){


        showPage("menuPage");


    }




    let categoryBox=document.getElementById(
        "categoryBox"
    );



    if(categoryBox){


        categoryBox.style.display="none";


    }



    if(typeof showPopularItems==="function"){


        showPopularItems();


    }



};







// ================================
// CART
// ================================


window.showCart=function(){



    historyPage.push(currentPage);


    showPage("cartPage");



    if(typeof displayCart==="function"){


        displayCart();


    }


};







// ================================
// CHECKOUT LOGIN
// ================================


window.checkout=function(){



    historyPage.push(currentPage);



    showPage("checkoutPage");



    if(typeof showLogin==="function"){


        showLogin();


    }


};







// ================================
// TOAST
// ================================


window.showToast=function(message){



    let toast=document.getElementById(
        "toast"
    );



    if(!toast){


        toast=document.createElement("div");

        toast.id="toast";

        document.body.appendChild(toast);


    }




    toast.innerHTML=message;



    toast.classList.add("show");




    setTimeout(function(){


        toast.classList.remove("show");


    },1000);



};








// ================================
// LOGIN STATUS
// ================================


window.checkLoginStatus=function(){



    let login =
    localStorage.getItem(
        "loggedIn"
    );



    let logoutButtons=[

        "logoutBtn",
        "logoutBtnCart"

    ];



    logoutButtons.forEach(function(id){


        let btn=document.getElementById(id);



        if(btn){



            btn.style.display =
            login==="yes"
            ?
            "block"
            :
            "none";



        }



    });



};







// ================================
// INITIAL LOAD
// ================================


window.onload=function(){


    showPage("welcome");


    checkLoginStatus();


};
