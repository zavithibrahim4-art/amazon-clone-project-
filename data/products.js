import { formatCurrency } from "../js/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

//a class grp elements together
class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  /* the constructor is a function like but it automatically runs when we CALL the class
    the constructor should be named constructor and it shouldn't return anything*/
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `${formatCurrency(this.priceCents)}`;
  }

  //this method is also used in the child class
  extraInfoHTML() {
    return "";
  }
}

// the extends keyword will extend the parent class with more data;
class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails) {
    //the super gives access to the parents constructor
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  /*this method is declared 2nd time this will override 
  the parent method this is known as method overriding*/
  extraInfoHTML() {
    /* the super() can also be used in the method to get access to the parent's 
    method  */

    //super.extraInfoHTML() to call the parent's method
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}



export function loadProductsFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      
      return response.json();
    })
    .then((productsData) => {
      products = productsData.map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });
      console.log("load products");
    }).catch((error)=>{
      console.log("Unexpected error try again later");
    });
    return promise
}




/*

export function loadProducts(fun) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {});
  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}
*/
export let products = [];
