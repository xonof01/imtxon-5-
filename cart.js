document.addEventListener("DOMContentLoaded", displayCartItems);

function displayCartItems() {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Savatingiz bo'sh</p>";
    return;
  }

  cartContainer.innerHTML = "";
  cart.forEach(async (productId) => {
    const product = await fetchProduct(productId);
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img class="img" src="${product.image}" alt="${product.name}">
      <div class="img-container">
        <h3  class="img-container">${product.name}</h3>
        <div class="price img-container">Narx: $${product.newPrice.toFixed(2)}</div>
      <button  class="img-container" onclick="removeFromCart(${product.id})">Olib tashlash</button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  const totalPrice = cart.reduce((total, productId) => {
    const product = getProductFromCart(productId);
    return total + product.newPrice;
  }, 0);

  const cartTotal = document.createElement("div");
  cartTotal.classList.add("cart-total");  
  cartContainer.appendChild(cartTotal);
}

async function fetchProduct(productId) {
  try {
    const response = await fetch(
      `https://cars-pagination.onrender.com/products/${productId}`
    );
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Mahsulotni olishda xatolik yuz berdi:", error);
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((id) => id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}

function getProductFromCart(productId) {
  return fetchProduct(productId);
}

