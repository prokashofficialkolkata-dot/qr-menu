// =====================================
// RESTORAN HAMEED'S BISTRO
// CART.JS V3 FINAL
// =====================================


let cart = JSON.parse(

localStorage.getItem("cart")

) || [];







// =====================================
// ADD TO CART
// =====================================


window.addToCart = async function(id){


try{


const {

db

}=await import("./firebase.js");



const {

doc,
getDoc

}=await import(

"https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js"

);





const ref =
doc(
db,
"menus",
id
);



const snap =
await getDoc(ref);





if(!snap.exists()){


showToast(
"Item not found"
);


return;


}




const item =
snap.data();





let exist =

cart.find(

x=>x.id===id

);






if(exist){


exist.qty +=1;


}

else{


cart.push({

id:id,

name:item.name,

price:Number(item.price),

image:item.image || "",

qty:1


});


}






saveCart();



showToast(
"Added to Cart"
);




}



catch(error){


console.log(error);



showToast(
error.message
);



}



};









// =====================================
// SAVE CART
// =====================================


function saveCart(){


localStorage.setItem(

"cart",

JSON.stringify(cart)

);


}









// =====================================
// DISPLAY CART
// =====================================


window.displayCart=function(){



const box =
document.getElementById(
"cartContainer"
);



if(!box)return;



box.innerHTML="";



let total=0;





cart.forEach((item,index)=>{


let amount =

item.price *
item.qty;



total += amount;





let div =
document.createElement(
"div"
);



div.className =
"cartItem";





div.innerHTML = `


<h3>
${item.name}
</h3>



<p>
RM ${item.price.toFixed(2)}
</p>



<button onclick="changeQty(${index},-1)">
-
</button>



${item.qty}



<button onclick="changeQty(${index},1)">
+
</button>



<p>
RM ${amount.toFixed(2)}
</p>


`;



box.appendChild(div);



});






let totalBox =
document.getElementById(
"cartTotal"
);



if(totalBox){

totalBox.innerHTML =

"Total: RM "

+

total.toFixed(2);

}



};









// =====================================
// CHANGE QUANTITY
// =====================================


window.changeQty=function(index,value){



cart[index].qty += value;





if(cart[index].qty<=0){


cart.splice(
index,
1
);


}



saveCart();



displayCart();



};









// =====================================
// GET CART TOTAL
// =====================================


window.getCartTotal=function(){


let total=0;



cart.forEach(item=>{


total +=

item.price *
item.qty;



});



return total;



};








// =====================================
// CLEAR CART
// =====================================


window.clearCart=function(){


cart=[];



localStorage.removeItem(
"cart"
);



displayCart();



};
