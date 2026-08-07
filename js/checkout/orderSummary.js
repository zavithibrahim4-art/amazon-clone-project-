import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
  cartQuantityUpdater
} from "../../data/cart.js";

import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// the above syntax is known as default export which doesnt need the {}

export function renderOrderSummary() {
  let matchingProduct;
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const { productId } = cartItem;
    // productId = cartItem.productId;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    let deliveryOption;
    const deliveryOptionId = cartItem.deliveryOptionId;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += /*template*/ `
    <div class="cart-item-container cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>

          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>

          <div class="product-quantity">
            <span>
              Quantity:
              <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                ${cartItem.quantity}
              </span>
            </span>

            <span
              class="update-quantity-link link-primary"
              data-product-id="${matchingProduct.id}"
            >
              Update
            </span>

            <input class="quantity-input" type="number" />

            <span
              class="save-quantity-link link-primary"
              data-product-id="${matchingProduct.id}"
            >
              Save
            </span>

            <span
              class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchingProduct.id}"
            >
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let HTML = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      HTML += /*html */ `
      <div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
        <input
          type="radio"
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />

        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>

          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
    `;
    });

    return HTML;
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);
      document.querySelector(`.cart-item-container-${productId}`).remove();
    });
  });

  document.querySelector(".js-return-to-home-link").innerHTML =
    `${cartQuantityUpdater()} items`;

  // to update

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      console.log(productId);

      document
        .querySelector(`.cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      console.log(productId);

      let container = document.querySelector(
        `.cart-item-container-${productId}`,
      );

      container.classList.remove("is-editing-quantity");

      let cartQuantity = Number(
        container.querySelector(".quantity-input").value,
      );

      // DOM always returns a string to convert this into a number we use Number()

      console.log(cartQuantity);

      if (cartQuantity <= 100) {
        updateQuantity(productId, cartQuantity);
      } else {
        alert("quantity cannot be greater than 100!");
        return;
      }
    });
  });

  // to get the formatted date using datejs

  const today = dayjs();
  const deliveryDate = today.add(7, "days");

  console.log(deliveryDate.format("dddd , MMMM D"));

  // this will format into saturday, october 21

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    const { productId, deliveryOptionId } = element.dataset;
    // const productId = element.dataset.productId;
    // const deliveryOptionId = element.dataset.deliveryOptionId;

    element.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
    });
  });
}
renderOrderSummary();
