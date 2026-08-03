// =====================================
// RESTORAN HAMEED'S BISTRO
// CART.JS FINAL WITH QUANTITY
// =====================================



// GET CART

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}






// SAVE CART

function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}







// ================================
// UPDATE CART COUNT
// ================================


window.updateCartCount=function(){


    let cart=getCart();


    let count=0;


    cart.forEach(function(item){

        count += Number(item.qty) || 0;

    });



    [
        "cartCount",
        "cartCount2",
        "cartCount3"
    ].forEach(function(id){


        let el=document.getElementById(id);


        if(el){

            el.innerHTML=count;

        }


    });


};









// ================================
// ADD ITEM
// ================================


window.addToCart=function(name,price){



    let cart=getCart();



    let found=cart.find(function(item){


        return item.name===name;


    });





    if(found){


        found.qty += 1;


    }

    else{


        cart.push({

            name:name,

            price:Number(price),

            qty:1

        });


    }





    saveCart(cart);



    updateCartCount();




    showToast(

    "Hameed's Bistro says "
    +
    name
    +
    " Added"

    );



};









// ================================
// DISPLAY CART
// ================================


window.displayCart=function(){



    let cart=getCart();



    let box=document.getElementById(
        "cartItems"
    );



    if(!box) return;



    box.innerHTML="";





    if(cart.length===0){


        box.innerHTML=

        `
        <h3 style="text-align:center">
        🛒 Cart Empty
        </h3>
        `;


        updateTotal();


        updateCartCount();


        return;


    }








    cart.forEach(function(item,index){



        let div=document.createElement(
            "div"
        );



        div.className="cart-item";





        div.innerHTML=


        `

        <div>

        <b>${item.name}</b>

        <br>

        RM ${Number(item.price).toFixed(2)}

        </div>



        <div>


        <button onclick="decreaseQty(${index})">

        -

        </button>



        <b style="padding:10px">

        ${item.qty}

        </b>



        <button onclick="increaseQty(${index})">

        +

        </button>



        <br><br>



        <button 
        onclick="removeCartItem(${index})">

        ❌ Remove

        </button>



        </div>


        `;





        box.appendChild(div);



    });





    updateTotal();


    updateCartCount();



};









// ================================
// INCREASE
// ================================


window.increaseQty=function(index){



    let cart=getCart();



    cart[index].qty += 1;



    saveCart(cart);



    displayCart();



};









// ================================
// DECREASE
// ================================


window.decreaseQty=function(index){



    let cart=getCart();



    if(cart[index].qty>1){


        cart[index].qty -=1;


    }

    else{


        cart.splice(index,1);


    }





    saveCart(cart);



    displayCart();



};









// ================================
// REMOVE
// ================================


window.removeCartItem=function(index){



    let cart=getCart();



    cart.splice(index,1);



    saveCart(cart);



    displayCart();



    showToast(

    "Item Removed"

    );



};









// ================================
// TOTAL + SST
// ================================


window.updateTotal=function(){



    let cart=getCart();



    let subtotal=0;



    cart.forEach(function(item){



        subtotal +=

        Number(item.price)

        *

        Number(item.qty);



    });





    let sst=

    subtotal * 0.06;




    let total=

    subtotal + sst;







    let box=document.getElementById(
        "total"
    );



    if(box){



        box.innerHTML=

        `

        Subtotal : RM ${subtotal.toFixed(2)}

        <br>

        6% SST : RM ${sst.toFixed(2)}

        <hr>

        Total : RM ${total.toFixed(2)}

        `;


    }




};









// ================================
// LOAD
// ================================


document.addEventListener(

"DOMContentLoaded",

function(){


    updateCartCount();


}

);
