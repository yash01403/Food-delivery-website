const menu = [
  { id: 1, name: "Pizza", price: 250, img: "https://www.freepik.com/photos/pizza/200" },
  { id: 2, name: "Burger", price: 120, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Pasta", price: 180, img: "https://via.placeholder.com/200" },
  { id: 4, name: "Fries", price: 90, img: "https://via.placeholder.com/200" }
];

let cart = {};
// https://www.freepik.com/photos/pizza
// Show Menu
function showMenu() {
  const menuDiv = document.getElementById("menu");

  menu.forEach(item => {
    menuDiv.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add</button>
      </div>
    `;
  });
}

// Add to Cart
function addToCart(id) {
  if (cart[id]) {
    cart[id].qty++;
  } else {
    const item = menu.find(i => i.id === id);
    cart[id] = { ...item, qty: 1 };
  }
  updateCart();
}

// Remove Item
function removeItem(id) {
  delete cart[id];
  updateCart();
}

// Update Cart UI
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  const count = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    totalItems += item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name} (x${item.qty}) - ₹${item.price * item.qty}
        <button onclick="removeItem(${item.id})">❌</button>
      </li>
    `;
  });

  totalSpan.innerText = total;
  count.innerText = totalItems;
}

// Place Order
function placeOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("✅ Order placed successfully!\nTotal: ₹" + document.getElementById("total").innerText);

  cart = {};
  updateCart();
}

// Init
showMenu();