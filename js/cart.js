// ==========================================
// RESTORAN HAMEED'S BISTRO
// CART SYSTEM V6 FINAL
// PART 1
// ==========================================


let cart =

JSON.parse(

localStorage.getItem(

"cart"

)

)

|| [];









// ==========================================
// ADD TO CART
// ==========================================


window.addToCart=function(id){



let item =

menuData.find(

x=>x.id===id

);






if(!item){



showToast(

"Item Not Found"

);



return;



}








let type =

localStorage.getItem(

"orderType"

)

|| "DINE IN";









let price =

type==="TAKE AWAY"

?

Number(item.takeAwayPrice)

:

Number(item.dineInPrice);









let old =

cart.find(

x=>x.id===id

);








if(old){


old.qty++;


}

else{



cart.push({



id:item.id,



name:item.name,



category:item.category || "Other",



price:price,



qty:1



});



}







saveCart();






showToast(

item.name+

" Added"

);



};









// ==========================================
// SAVE CART
// ==========================================


function saveCart(){



localStorage.setItem(

"cart",

JSON.stringify(cart)

);





updateCartCount();



}
// ==========================================
// CART COUNT
// ==========================================


function updateCartCount(){



let count =

cart.reduce(

(sum,item)=>

sum + item.qty,

0

);







[

"cartCount",

"cartCount2",

"cartCount3"

]

.forEach(id=>{



let el =

document.getElementById(id);



if(el){


el.innerHTML=count;


}



});



}









// ==========================================
// SHOW CART
// ==========================================


window.showCart=function(){



document.getElementById(

"welcome"

).style.display="none";




document.getElementById(

"menuPage"

).style.display="none";




document.getElementById(

"cartPage"

).style.display="block";







displayCart();



};









// ==========================================
// DISPLAY CART
// ==========================================


function displayCart(){



let box =

document.getElementById(

"cartItems"

);





if(!box)return;






box.innerHTML="";







if(cart.length===0){



box.innerHTML=

`

<h3>

Cart Empty

</h3>

`;



updateTotal();



return;



}









cart.forEach(item=>{



box.innerHTML += `



<div class="cart-item">



<div>


<h3>

${item.name}

</h3>



<p>

RM ${Number(item.price).toFixed(2)}

</p>



</div>




<div>


<button onclick="minusQty('${item.id}')">

➖

</button>



<b>

${item.qty}

</b>



<button onclick="plusQty('${item.id}')">

➕

</button>



<br>



<button onclick="removeItem('${item.id}')">

🗑 Remove

</button>



</div>



</div>



`;



});






updateTotal();



}









// ==========================================
// PLUS QUANTITY
// ==========================================


window.plusQty=function(id){



let item =

cart.find(

x=>x.id===id

);





if(item){


item.qty++;


}






saveCart();


displayCart();



};









// ==========================================
// MINUS QUANTITY
// ==========================================


window.minusQty=function(id){



let item =

cart.find(

x=>x.id===id

);







if(item && item.qty>1){



item.qty--;



}






saveCart();


displayCart();



};









// ==========================================
// REMOVE ITEM
// ==========================================


window.removeItem=function(id){



cart =

cart.filter(

x=>x.id!==id

);






saveCart();


displayCart();



};









// ==========================================
// TOTAL
// ==========================================


function updateTotal(){



let total =

cart.reduce(

(sum,item)=>

sum +

(

Number(item.price)

*

Number(item.qty)

),

0

);







let box =

document.getElementById(

"total"

);






if(box){



box.innerHTML=

"Total : RM "

+

total.toFixed(2);



}



}









// ==========================================
// INITIAL
// ==========================================


updateCartCount();
