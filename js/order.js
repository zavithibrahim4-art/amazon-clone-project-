import { orders } from "../data/orders.js";

import { products, loadProductsFetch } from "../data/products.js";

import { cartQuantityUpdater, addToCart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

await loadProductsFetch();
let ordersHTML = "";

orders.forEach((order) => {
  ordersHTML += `
    <div class="order-container">

      <div class="order-header">

        <div class="order-header-left-section">

          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>
              ${new Date(order.orderTime).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>
              $${formatCurrency(order.totalCostCents)}
            </div>
          </div>

        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>

      </div>

      <div class="order-details-grid">

        ${order.products
          .map((orderProduct) => {
            const product = products.find((product) => {
              return product.id === orderProduct.productId;
            });

            const deliveryDate = new Date(
              orderProduct.estimatedDeliveryTime,
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            });

            return `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">

              <div class="product-name">
                ${product.name}
              </div>

              <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
              </div>

              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>

<button class="buy-again-button button-primary" data-product-id="${product.id}">                <img
                  class="buy-again-icon"
                  src="images/icons/buy-again.png"
                >
                <span class="buy-again-message">
                  Buy it again
                </span>
              </button>

            </div>

            <div class="product-actions">

              <a
                href="tracking.html?orderId=${order.id}&productId=${product.id}"
              >
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>

            </div>
          `;
          })
          .join("")}

      </div>
    </div>
  `;
});

document.querySelector(".orders-grid").innerHTML = ordersHTML;

document.querySelector(".cart-quantity").innerHTML = cartQuantityUpdater();


document.querySelectorAll(".buy-again-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    document.querySelector(".cart-quantity").innerHTML = cartQuantityUpdater();
  });
});
