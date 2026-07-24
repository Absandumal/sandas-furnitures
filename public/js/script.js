// =========================
// MOBILE MENU
// =========================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

// =========================
// STATE
// =========================

let allProducts = [];
let currentFilter = "all";

const productContainer = document.getElementById("productContainer");
const filterButtons = document.querySelectorAll(".filter-button");

// =========================
// HELPERS
// =========================

function renderStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  let stars = "";

  for (let i = 0; i < full; i++) stars += '<i class="fa-solid fa-star"></i>';
  if (hasHalf) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  const empty = 5 - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < empty; i++) stars += '<i class="fa-regular fa-star"></i>';

  return stars;
}

function formatPrice(price) {
  return "$" + Number(price).toLocaleString("en-US");
}

// =========================
// FETCH & RENDER PRODUCTS
// =========================

async function loadProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    allProducts = await response.json();
    renderProducts();
  } catch (err) {
    console.error(err);
    productContainer.innerHTML =
      '<p class="no-products">Could not load products right now. Please refresh the page.</p>';
  }
}

function renderProducts() {
  const filtered =
    currentFilter === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === currentFilter);

  if (filtered.length === 0) {
    productContainer.innerHTML = '<p class="no-products">No products found in this category.</p>';
    return;
  }

  productContainer.innerHTML = filtered
    .map(
      (product, index) => `
      <div class="product-card" data-id="${product.id}" style="animation-delay:${index * 0.05}s">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-rating">
            ${renderStars(product.rating)}
            <span>${product.rating.toFixed(1)}</span>
          </div>
          <p class="product-desc">${product.description}</p>
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="view-details-button" data-id="${product.id}">View Details</button>
        </div>
      </div>
    `
    )
    .join("");

  attachProductCardListeners();
}

function attachProductCardListeners() {
  document.querySelectorAll(".view-details-button").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = Number(this.dataset.id);
      const product = allProducts.find((p) => p.id === productId);
      if (product) openModal(product);
    });
  });
}

// =========================
// PRODUCT FILTER
// =========================

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.category;
    renderProducts();
  });
});

// =========================
// PRODUCT DETAILS MODAL
// =========================

const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalRating = document.getElementById("modalRating");
const modalWhatsapp = document.getElementById("modalWhatsapp");

function openModal(product) {
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = formatPrice(product.price);
  modalRating.innerHTML = `${renderStars(product.rating)} <span style="color:#777; margin-left:6px;">${product.rating.toFixed(1)}</span>`;

  const message = `Hello Sandas Furnitures! I am interested in the ${product.name}. Please provide more details.`;
  modalWhatsapp.href = "https://wa.me/94743667475?text=" + encodeURIComponent(message);

  productModal.classList.add("active");
}

closeModal.addEventListener("click", function () {
  productModal.classList.remove("active");
});

productModal.addEventListener("click", function (event) {
  if (event.target === productModal) {
    productModal.classList.remove("active");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    productModal.classList.remove("active");
  }
});

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  contactSubmit.disabled = true;
  contactSubmit.querySelector(".btn-text").style.display = "none";
  contactSubmit.querySelector(".btn-spinner").style.display = "inline-block";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      formStatus.textContent = data.message;
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      formStatus.textContent = data.message || "Something went wrong. Please try again.";
      formStatus.classList.add("error");
    }
  } catch (err) {
    console.error(err);
    formStatus.textContent = "Could not reach the server. Please try again later.";
    formStatus.classList.add("error");
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.querySelector(".btn-text").style.display = "inline";
    contactSubmit.querySelector(".btn-spinner").style.display = "none";
  }
});

// =========================
// INIT
// =========================

loadProducts();
