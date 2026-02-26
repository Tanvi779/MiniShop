import { addToCart } from "./cart.js";

// Reusable product card creator
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  const title = document.createElement("h3");
  title.textContent = product.title;

  const price = document.createElement("p");
  price.textContent = `$${product.price}`;

  const button = document.createElement("button");
  button.className = "add-to-cart";
  button.textContent = "Add to cart";
  button.addEventListener("click", () => addToCart(product));

  card.append(img, title, price, button);

  return card;
}

export async function renderProducts() {
  const app = document.getElementById("app");
  app.innerHTML = "Loading products...";

  try {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  app.innerHTML = "";

  const productsPage = document.createElement("div");
  productsPage.className = "products-page";

  const search = document.createElement("input");
  search.type = "text";
  search.placeholder = "Search products...";
  search.className = "search-input";

  const sort = document.createElement("select");

  sort.className = "search-input";
  const defaultOption = new Option("Sort", "");
  const lowOption = new Option("Price: Low → High", "low");
  const highOption = new Option("Price: High → Low", "high");

  sort.append(defaultOption, lowOption, highOption);

  const grid = document.createElement("div");
  grid.className = "product-grid";

  productsPage.append(search, sort, grid);
  app.appendChild(productsPage);

  function displayProducts(products) {
    grid.innerHTML = "";
    products.forEach(product => {
      grid.appendChild(createProductCard(product));
    });
  }

  function filterAndSort() {
    let filtered = data.filter(p =>
      p.title.toLowerCase().includes(search.value.toLowerCase())
    );

    if (sort.value === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort.value === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    displayProducts(filtered);
  }

  displayProducts(data);

  search.addEventListener("input", filterAndSort);
  sort.addEventListener("change", filterAndSort);

} catch (error) {
  app.textContent = "Failed to load products.";
}
}

export function renderHome() {
  const app = document.getElementById("app");
  app.textContent = "Welcome to MiniShop! Browse products above.";
}



