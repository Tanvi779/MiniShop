
import { renderHome, renderProducts } from "./product.js";
import { renderCart } from "./cart.js";

const routes = {
  "/": renderHome,
  "/products": renderProducts,
  "/cart": renderCart,
};

export function navigate(path) {
  history.pushState({}, "", path);
  renderRoute();
}

export function renderRoute() {
  let path = location.pathname;
  if (path === "/index.html") {path = "/"}  
  else if (path === "/product") {path = "/product"}
  else if (path === "/cart") {path = "/cart"}
  const route = routes[path] || renderNotFound;
  route();
}

function renderNotFound() {
  const app = document.getElementById("app");
  app.textContent = "Page not found.";
}

window.addEventListener("popstate",renderRoute);

document.addEventListener("click", (e) => {
 const link= e.target.closest("[data-link]")
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});
  