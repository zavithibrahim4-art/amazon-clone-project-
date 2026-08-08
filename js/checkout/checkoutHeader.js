import { cartQuantityUpdater } from "../../data/cart.js";

let checkoutHeaderHTML = "";

export default function checkoutHeader() {
  checkoutHeaderHTML = `
    Checkout  &nbsp;
    <a href="amazon.html" class="return-to-home-link">
       (${cartQuantityUpdater()} items)
    </a>
  `;

  document.querySelector(".js-checkout-header-middle-section").innerHTML =
    checkoutHeaderHTML;
}