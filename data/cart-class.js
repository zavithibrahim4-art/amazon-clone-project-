class Cart {
  //like object use = instead of :
  // cartItems = undefined;
  //property without a # is known as public property
  cartItems;

  //#variable name means the property can only be accessed inside the class
  //the private variable cant be changed outside the class
  #localStorageKey;

  /* the constructor is a function like but it automatically runs when we CALL the class
    the constructor should be named constructor and it shouldn't return anything*/
  constructor(key) {
    this.#localStorageKey = key;
    this.#loadFromLocalStorage();
  }

  //#loadFromLocalStorage : function loadFromLocalStorage(){}
  // a method can also be private
  #loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    // JSON.parse will convert the string back to an array

    if (!this.cartItems) {
      this.cartItems = [
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
  }

  //  saveToLocalStorage: function()
  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));

    // to store the cart in the local storage to stop resetting after refresh
  }

  //addtocart(): function addtocart(){}
  addToCart(productId) {
    const quantityElement = document.querySelector(
      `.js-product-quantity-${productId}`,
    );

    // If the quantity input is not present (e.g. in unit tests or certain pages),
    // default to 1 so the function doesn't throw when trying to read .value.
    const quantity = quantityElement ? quantityElement.value : "1";
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      // an object is a truthy value so if present it will return true
      matchingItem.quantity += Number(quantity);
    } else {
      this.cartItems.push({
        productId, // productId: productId
        quantity: Number(quantity), // shorthand
        deliveryOptionId: "1",
      });
    }

    this.saveToLocalStorage();

    // to update the cart
  }

  removeFromCart(productId) {
    const newCartArray = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCartArray.push(cartItem);
      }
    });

    this.cartItems = newCartArray; // replace the removed item cart

    this.saveToLocalStorage();
  }

  cartQuantityUpdater() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
          newQuantity;

        document.querySelector(".js-return-to-home-link").innerHTML =
          `${this.cartQuantityUpdater()} items`;
      }
    });

    this.saveToLocalStorage();
  }

  updateDeliveryOption(productId, DeliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = DeliveryOptionId;
    this.saveToLocalStorage();
  }
}

const cart = new Cart("car-oop");

const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);

cart.addToCart("0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524");

console.log(businessCart instanceof Cart);

