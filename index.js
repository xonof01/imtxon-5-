
document.addEventListener("DOMContentLoaded", fetchProducts);

let allProducts = []; // Global variable to store all products

// Function to fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch("https://cars-pagination.onrender.com/products");
        const data = await response.json();
        allProducts = data; // Store all products globally
        const productsSlice = data.slice(2, 12); // Slice to show a subset of products
        displayProducts(productsSlice);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to display products in the UI
function displayProducts(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
            <h3>${product.name}</h3>
            <div class="category">Category: ${product.category}</div>
            <div class="new-price">New Price: $${product.newPrice.toFixed(2)}</div>
            <div class="old-price">Old Price: $${product.oldPrice.toFixed(2)}</div>
            <div class="rating">
                Rating: ${product.star}
                <span class="stars">${"★".repeat(Math.round(product.star))}
                ${"☆".repeat(5 - Math.round(product.star))}</span>
            </div>
            <button class="btn" onclick="viewProduct(${product.id})">View Details</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Function to redirect to detail page when viewing a product
function viewProduct(productId) {
    window.location.href = `detail.html?id=${productId}`;
}

// Event listener for filtering products by price
document.getElementById("price-filter").addEventListener("change", filterProductsByPrice);

// Function to filter products based on selected price range
function filterProductsByPrice() {
    const priceRange = document.getElementById("price-filter").value;
    const filteredProducts = allProducts.filter((product) => {
        if (priceRange === "0") {
            return true; // Include all products
        } else if (priceRange === "50") {
            return product.newPrice > 43108;
        } else if (priceRange === "100") {
            return product.newPrice >= 10136 && product.newPrice <= 43108;
        } else if (priceRange === "200") {
            return product.newPrice >= 49394 && product.newPrice <= 10136;
        } else if (priceRange === "500") {
            return product.newPrice >= 16896 && product.newPrice <= 49394;
        }
    });
    displayProducts(filteredProducts);
}

// Function to filter products by category (needs to be corrected)
function filterProductsByCategory() {
    const categoryType = document.getElementById("category-filter").value;
    const filteredProducts = allProducts.filter((product) => {
        if (categoryType === "1") {
            return true; // Include all products
        } else if (categoryType === "2") {
            return product.category === "Средний"; // Replace with correct category name
        } else if (categoryType === "3") {
            return product.category === "Не популярен"; // Replace with correct category name
        }
    });
    displayProducts(filteredProducts);
}
