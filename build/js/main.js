import ExternalServices from "./ExternalServices.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter, updateCartNumber } from "./utils.js";

await loadHeaderFooter();
updateCartNumber();
