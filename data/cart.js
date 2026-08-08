export let cart = JSON.parse(localStorage.getItem("cart"));

// JSON.parse will convert the string back to an array

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));

  // to store the cart in the local storage to stop resetting after refresh
}

export function addToCart(productId) {
  const quantity = document.querySelector(
    `.js-product-quantity-${productId}`,
  ).value;

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    // an object is a truthy value so if present it will return true
    matchingItem.quantity += Number(quantity);
  } else {
    cart.push({
      productId, // productId: productId
      quantity: Number(quantity), // shorthand
      deliveryOptionId: "1",
    });
  }

  saveToLocalStorage();

  // to update the cart
}

export function removeFromCart(productId) {
  const newCartArray = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCartArray.push(cartItem);
    }
  });

  cart = newCartArray; // replace the removed item cart

  saveToLocalStorage();

  
 
}

export function cartQuantityUpdater() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity;

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQuantity;

      document.querySelector(".js-return-to-home-link").innerHTML =
        `${cartQuantityUpdater()} items`;
    }
  });

  saveToLocalStorage();
}

export function updateDeliveryOption(productId, DeliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = DeliveryOptionId;
  saveToLocalStorage();
}

