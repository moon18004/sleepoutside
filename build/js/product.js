import ExternalServices from "./ExternalServices.js";
import ProductDetails from "./productDetails.js";
import { getParam } from "./utils.js";

const productID = getParam("product");
const dataSource = new ExternalServices();

const product = new ProductDetails(productID, dataSource);
product.init();
