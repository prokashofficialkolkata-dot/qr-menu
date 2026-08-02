let menuData = [];
let priceMode = 'dine';

async function loadMenu() {
  const response = await fetch('item.csv');
  const csv = await response.text();

  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  menuData = lines.slice(1).map(line => {
    const values = line.split(',');
    let item = {};
    headers.forEach((h, i) => {
      item[h.trim()] = values[i] ? values[i].trim() : '';
    });
    return item;
  });

  showMenu();
}

function showMenu() {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  menuData.forEach(item => {
    const price = priceMode === 'dine'
      ? item['Dine Price'] || item['Price']
      : item['Take Away Price'] || item['Price'];

    container.innerHTML += `
      <div class="menu-card">
        <h3>${item['Item Name'] || item['Name']}</h3>
        <p>RM ${price}</p>
      </div>
    `;
  });
}

function setDine() {
  priceMode = 'dine';
  showMenu();
}

function setTakeAway() {
  priceMode = 'take';
  showMenu();
}

window.onload = loadMenu;
