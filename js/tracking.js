import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cartQuantityUpdater } from "../data/cart.js";

await loadProductsFetch();

const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");
const productId = params.get("productId");

const order = orders.find((order) => order.id === orderId);
const orderProduct = order
  ? order.products.find((p) => p.productId === productId)
  : undefined;

let trackingHTML = "";

if (order && orderProduct) {
  const product = getProduct(orderProduct.productId);

  const orderTime = new Date(order.orderTime).getTime();
  const deliveryTime = new Date(orderProduct.estimatedDeliveryTime).getTime();
  const currentTime = Date.now();

  let progressPercent =
    ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
  progressPercent = Math.max(0, Math.min(100, progressPercent));

  let status = "Preparing";
  if (progressPercent >= 100) status = "Delivered";
  else if (progressPercent >= 50) status = "Shipped";

  const deliveryDateString = new Date(
    orderProduct.estimatedDeliveryTime,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    <div class="delivery-date">Arriving on ${deliveryDateString}</div>
    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${orderProduct.quantity}</div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${status === "Preparing" ? "current-status" : ""}">Preparing</div>
      <div class="progress-label ${status === "Shipped" ? "current-status" : ""}">Shipped</div>
      <div class="progress-label ${status === "Delivered" ? "current-status" : ""}">Delivered</div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressPercent}%;"></div>
    </div>
  `;
} else {
  trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    <div class="delivery-date">Order not found</div>
  `;
}

document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
document.querySelector(".cart-quantity").innerHTML = cartQuantityUpdater();
