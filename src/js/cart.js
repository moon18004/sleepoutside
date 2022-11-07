import {
  getLocalStorage,
  setLocalStorage,
  updateCartNumber,
  loadHeaderFooter,
  renderwithTemplate
} from "./utils.js";
import ShoppingCart from "./shoppingCart.js";

await loadHeaderFooter();
const cart = new ShoppingCart();
cart.init();