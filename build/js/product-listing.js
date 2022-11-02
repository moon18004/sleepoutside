import ExternalServices from "./ExternalServices.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter, getParam } from "./utils.js";

const category = getParam("category");
const productSource = new ExternalServices();
const url = document.querySelector(".product-list");
const productList = new ProductListing(category, productSource, url);

productList.init();
