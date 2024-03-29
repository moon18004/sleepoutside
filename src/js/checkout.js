import { loadHeaderFooter, updateCartNumber } from "./utils.js";
import CheckoutProcess from "./CheckoutProcess.js";

await loadHeaderFooter();
updateCartNumber();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

  // listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  //
  const formElement = document.forms["checkout"];
  const checkForm = formElement.checkValidity();
  formElement.reportValidity();
  if (checkForm) {
    myCheckout.checkout();
  }
});
