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
