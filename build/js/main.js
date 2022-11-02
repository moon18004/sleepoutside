import ExternalServices from "./ExternalServices.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter, updateCartNumber } from "./utils.js";

// const productSource = new ProductData("tents");
// const url = document.querySelector(".product-list");
// const productList = new ProductListing("tents", productSource, url);

// productList.init();

await loadHeaderFooter();
updateCartNumber();
