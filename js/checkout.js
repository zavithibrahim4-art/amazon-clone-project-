import checkoutHeader from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";

/* a promise is a class :
  it takes a function with a param resolve
  the resolve is a function which can be called anywhere inside the arrow function
  the resolve will fulfills  the promise and move to the next step
  but the resolve doesn't end the function like a return
  the next step has to be declared with a .then(function) method
  
  
  const promise1 = new Promise((resolve) => {
  resolve("Promise 1");
  //here the resolve takes a parameter and then the .then() gets the value as a parameter
});

const promise2 = new Promise((resolve) => {
  resolve("Promise 2");
});

promise1.then((result) => {
  console.log(result);
});

promise2.then((result) => {
  console.log(result);
}); in the above example each promise will wait for an another promise  it will take more time
to rectify this issue we use promise.all()
const promise1 = new Promise((resolve) => {
  resolve("Promise 1");
});

const promise2 = new Promise((resolve) => {
  resolve("Promise 2");
});

Promise.all([promise1, promise2])
  .then((results) => {
    console.log(results);
  });*/

async function loadPage() {
  try {
    //throw "value" for synchronous
    // the value will be passed as a param to thr catch
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
    checkoutHeader();
  } catch (error) {
    console.log(error);
    console.log("Unexpected error try again later");
  }
}
loadPage();

const promise = new Promise((resolve, reject) => {
  //reject was to throw an error in the future
  // reject("unresolved"); for asynchronous
  //the if rejected next line wont execute like return
  resolve("Success!");

}).then((value) => {
  console.log(value);
});

/*
new Promise((resolve) => {
  function hi() {
    console.log("hi");
    resolve();
    console.log("bye");
  }
  hi();
}).then(() => {
  console.log("finished");
});
/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  checkoutHeader();
});
*/
