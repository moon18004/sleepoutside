import ProductData from "./productData.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter, updateCartNumber } from "./utils.js";

await loadHeaderFooter();
updateCartNumber();
