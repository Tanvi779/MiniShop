
// Toast function (reusable)LL
export function toast(message, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;

    document.body.appendChild(t);

    // Remove after CSS animation ends
    t.addEventListener("animationend", () => t.remove());
}

export function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  toast("Added to cart!", "success");
  updateCartCount();
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

export function renderCart() {
  const app = document.getElementById("app");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  app.textContent = "";

  if (cart.length === 0) {
    app.textContent = "Cart is empty.";
    return;
  }

    // Total Section
  let totalDiv = document.createElement("h2");

  function renderTotal() {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    totalDiv.textContent = `Total: $${total}`;
  }


  // Empty Cart Button
  const emptyBtn = document.createElement("button");
  emptyBtn.className = "emptyBtn";
  emptyBtn.textContent = "Empty Cart";
  app.append(emptyBtn);

  emptyBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    toast("Cart cleared!", "error");
    updateCartCount();
    renderCart();
  });

  // Render Items
  cart.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";

    const title = document.createElement("h3");
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price}`;

    const qtyDisplay = document.createElement("span");
    qtyDisplay.textContent = product.qty;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";

    const minBtn = document.createElement("button");
    minBtn.textContent = "-";

    const subtotal = document.createElement("p");

    function updateSubtotal() {
      const sub = product.qty * product.price;
      subtotal.textContent = `Subtotal: $${sub}`;
      renderTotal();
    }

    plusBtn.addEventListener("click", () => {
      product.qty++;
      localStorage.setItem("cart", JSON.stringify(cart));
      qtyDisplay.textContent = product.qty;
      updateSubtotal();
      updateCartCount();
    });

    minBtn.addEventListener("click", () => {
      if (product.qty > 1) {
        product.qty--;
        localStorage.setItem("cart", JSON.stringify(cart));
        qtyDisplay.textContent = product.qty;
        updateSubtotal();
        updateCartCount();
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast("Product removed!", "error");
      updateCartCount();
      renderCart();
    });

    updateSubtotal();

    item.append(title, price, plusBtn, qtyDisplay, minBtn, subtotal, removeBtn);
    app.append(item);
  });


  renderTotal();
  app.append(totalDiv);

  // Checkout Button
  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Proceed to Checkout";
  checkoutBtn.className = "checkoutBtn";

  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  app.append(checkoutBtn);
}
 