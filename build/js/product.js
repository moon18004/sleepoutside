import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam } from "./utils.js";

const productID = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);
product.init();
// add listener to Add to Cart button
