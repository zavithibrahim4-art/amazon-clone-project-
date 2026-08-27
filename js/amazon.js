import { cart, addToCart } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { cartQuantityUpdater } from "../data/cart.js";

await loadProductsFetch();

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search") || "";

document.querySelector(".search-bar").value = searchTerm;

renderHomePageGrid(searchTerm);

document.querySelector(".search-button").addEventListener("click", runSearch);

document.querySelector(".search-bar").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runSearch();
  }
});

function renderHomePageGrid(searchTerm = "") {
  let productsHTML = "";

  const filteredProducts = searchTerm
    ? products.filter((product) => {
        const term = searchTerm.toLowerCase();
        const nameMatches = product.name.toLowerCase().includes(term);
        const keywordMatches = product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(term),
        );
        return nameMatches || keywordMatches;
      })
    : products;

  if (filteredProducts.length === 0) {
    document.querySelector(".js-products-grid").innerHTML =
      `<div class="no-products-message">No products found.</div>`;
    document.querySelector(".js-cart-quantity").innerHTML =
      cartQuantityUpdater();
    return;
  }

  filteredProducts.forEach((product) => {
    productsHTML += /*template*/ `
    <div class="product-container ">
      <div class="product-image-container">
        <img
          class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="${product.getStarsUrl()}"
          loading="lazy">

        <div class="product-rating-count link-primary">
          ${product.getPrice()}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container js-product-quantity-container">
        <select class="js-product-quantity-${product.id}">
          <option selected value="1" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}
      <div class="product-spacer"></div>

      <div class="added-to-cart js-add-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button
        class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}"
        >
        Add to Cart
      </button>
    </div>
  `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  let timerId;
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      clearTimeout(timerId);
      const { productId } = button.dataset;
      //this means const productId = button.dataset.productId;
      const quantity = document.querySelector(
        `.js-product-quantity-${productId}`,
      ).value;
      //to display add to cart

      let addedMessage = document.querySelector(`.js-add-to-cart-${productId}`);
      addedMessage.classList.add("display-add-to-cart");
      timerId = setTimeout(() => {
        addedMessage.classList.remove("display-add-to-cart");
      }, 2000);
      addToCart(productId);
      document.querySelector(".js-cart-quantity").innerHTML =
        cartQuantityUpdater();
    });
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantityUpdater();
}
