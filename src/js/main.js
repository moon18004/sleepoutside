import ProductData from "./productData.js";
import ProductListing from "./productList.js";

const productSource = new ProductData("tents");
const url = document.querySelector(".product-list");
const productList = new ProductListing("tents", productSource, url);

productList.init();
