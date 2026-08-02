// =========================
// Hameeds Bistro QR Menu
// Part 1
// =========================

let menuData = [];
let priceMode = "dine";

async function loadMenu() {
    try {
        const response = await fetch("menu.csv");
        const csv = await response.text();

        const rows = csv.trim().split("\n");
        const headers = rows[0].split(",");

        menuData = rows.slice(1).map(row => {
            const values = row.split(",");
            let item = {};

            headers.forEach((header, index) => {
                item[header.trim()] = values[index]
                    ? values[index].trim()
                    : "";
            });

            return item;
        });

        renderMenu();

    } catch (err) {
        document.getElementById("menu-container").innerHTML =
            "<h2 style='text-align:center;color:red;'>Failed to load menu.csv</h2>";

        console.error(err);
    }
}

function setPriceMode(mode) {
    priceMode = mode;
    renderMenu();
}

function renderMenu() {

    const container = document.getElementById("menu-container");

    container.innerHTML = "";

    menuData.forEach(item => {

        let price = "";

        if (priceMode === "dine") {
            price =
                item["Dine In Price"] ||
                item["Dine Price"] ||
                item["Dine"] ||
                item["Price"] ||
                "";
        } else {
            price =
                item["Take Away Price"] ||
                item["Takeaway Price"] ||
                item["Take Away"] ||
                item["Takeaway"] ||
                item["Price"] ||
                "";
        }

        const card = document.createElement("div");

        card.className = "menu-card";

        card.innerHTML = `
            <h3>${item["Item Name"] || item["Name"] || ""}</h3>

            <p>${item["Category"] || ""}</p>

            <div class="price">
                RM ${price}
            </div>
        `;

        container.appendChild(card);

    });

}

loadMenu();

let currentCategory = "All";
let searchText = "";

function getItemName(item){
    return (
        item["Item Name"] ||
        item["Name"] ||
        item["Product Name"] ||
        ""
    );
}

function getCategory(item){
    return (
        item["Category"] ||
        item["Menu Category"] ||
        "Others"
    );
}

function createCategoryButtons(){

    const container=document.createElement("div");
    container.className="category-bar";

    let categories=["All"];

    menuData.forEach(item=>{
        let cat=getCategory(item);

        if(!categories.includes(cat)){
            categories.push(cat);
        }
    });

    categories.forEach(cat=>{

        const btn=document.createElement("button");

        btn.innerText=cat;

        btn.onclick=()=>{
            currentCategory=cat;
            renderMenu();
        };

        container.appendChild(btn);

    });

    return container;

}

function createSearchBox(){

    const input=document.createElement("input");

    input.type="text";

    input.placeholder="Search Menu...";

    input.className="search-box";

    input.oninput=(e)=>{
        searchText=e.target.value.toLowerCase();
        renderMenu();
    };

    return input;

}

const oldRenderMenu=renderMenu;

renderMenu=function(){

    const container=document.getElementById("menu-container");

    container.innerHTML="";

    container.appendChild(createSearchBox());

    container.appendChild(createCategoryButtons());

    menuData.forEach(item=>{

        const name=getItemName(item);

        const category=getCategory(item);

        if(currentCategory!="All" && category!=currentCategory){
            return;
        }

        if(!name.toLowerCase().includes(searchText)){
            return;
        }

        let price="";

        if(priceMode=="dine"){

            price=
            item["Dine In Price"] ||
            item["Dine Price"] ||
            item["Price"] ||
            "";

        }else{

            price=
            item["Take Away Price"] ||
            item["Takeaway Price"] ||
            item["Price"] ||
            "";

        }

        const card=document.createElement("div");

        card.className="menu-card";

        card.innerHTML=`
            <h3>${name}</h3>
            <p>${category}</p>
            <div class="price">RM ${price}</div>
        `;

        container.appendChild(card);

    });

}
// =========================
// Part 3
// Image + Stock + Price Format
// =========================

function getImage(item) {
    return (
        item["Image"] ||
        item["Photo"] ||
        item["Picture"] ||
        "images/no-image.png"
    );
}

function getStock(item) {
    return (
        item["Stock"] ||
        item["Status"] ||
        "Available"
    );
}

const oldRender = renderMenu;

renderMenu = function () {

    const container = document.getElementById("menu-container");
    container.innerHTML = "";

    container.appendChild(createSearchBox());
    container.appendChild(createCategoryButtons());

    menuData.forEach(item => {

        const name = getItemName(item);
        const category = getCategory(item);

        if (currentCategory !== "All" && category !== currentCategory) return;
        if (!name.toLowerCase().includes(searchText)) return;

        const price = priceMode === "dine"
            ? (item["Dine In Price"] || item["Price"] || "0.00")
            : (item["Take Away Price"] || item["Price"] || "0.00");

        const image = getImage(item);
        const stock = getStock(item);

        const card = document.createElement("div");
        card.className = "menu-card";

        card.innerHTML = `
            <img src="${image}" style="width:100%;border-radius:10px;" onerror="this.src='images/no-image.png'">

            <h3>${name}</h3>

            <p>${category}</p>

            <div class="price">RM ${price}</div>

            <p style="color:${stock === "Out Of Stock" ? "red" : "green"};">
                ${stock}
            </p>
        `;

        container.appendChild(card);

    });

}
// =========================
// Hameeds Bistro QR Menu
// Part 4
// Cart + Order System
// =========================

let cart = [];


function addToCart(item){

    const name = getItemName(item);

    const price = priceMode === "dine"
        ? (item["Dine In Price"] || item["Price"] || "0.00")
        : (item["Take Away Price"] || item["Price"] || "0.00");


    let existing = cart.find(x => x.name === name);


    if(existing){

        existing.qty++;

    }else{

        cart.push({
            name:name,
            price:parseFloat(price),
            qty:1
        });

    }


    showCart();

}



function showCart(){

    let cartBox = document.getElementById("cart-box");


    if(!cartBox){

        cartBox=document.createElement("div");

        cartBox.id="cart-box";

        cartBox.style.position="fixed";
        cartBox.style.bottom="10px";
        cartBox.style.right="10px";
        cartBox.style.background="#fff";
        cartBox.style.padding="15px";
        cartBox.style.borderRadius="10px";
        cartBox.style.boxShadow="0 0 10px #999";
        cartBox.style.width="300px";
        cartBox.style.zIndex="999";


        document.body.appendChild(cartBox);

    }


    let html="<h3>Your Order</h3>";


    let total=0;


    cart.forEach((item,index)=>{

        let subtotal=item.price * item.qty;

        total += subtotal;


        html += `
        <div style="margin-bottom:8px;">
            ${item.name}<br>

            RM ${item.price.toFixed(2)}

            x ${item.qty}

            <button onclick="removeCart(${index})">
            X
            </button>

        </div>
        `;


    });


    html += `

    <hr>

    <b>Total : RM ${total.toFixed(2)}</b>

    <br><br>

    <button onclick="sendWhatsAppOrder()">
    Order WhatsApp
    </button>

    `;


    cartBox.innerHTML=html;

}



function removeCart(index){

    cart.splice(index,1);

    showCart();

}




function sendWhatsAppOrder(){


    let message="Hameeds Bistro Order%0A%0A";


    let total=0;


    cart.forEach(item=>{

        let subtotal=item.price*item.qty;

        total+=subtotal;


        message += 
        `${item.name} x ${item.qty} = RM ${subtotal.toFixed(2)}%0A`;

    });


    message += 
    `%0ATotal RM ${total.toFixed(2)}`;


    let phone="60387059807";


    window.open(
        "https://wa.me/"+phone+"?text="+message,
        "_blank"
    );


}
