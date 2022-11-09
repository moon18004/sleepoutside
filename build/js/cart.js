import {
  getLocalStorage,
  setLocalStorage,
  updateCartNumber,
  loadHeaderFooter,
  renderwithTemplate,
} from "./utils.js";
import ShoppingCart from "./shoppingCart.js";

await loadHeaderFooter();
const cart = new ShoppingCart();
cart.init();

function getCartContents() {
  let markup = "";
  let cartItems;
  try {
    cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    if (!Array.isArray(cartItems)) cartItems = [cartItems];
  } catch (err) {
    cartItems = [];
  }
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  cartItems.length == 0
    ? (document.querySelector(".product-list").innerHTML =
        "<h3>There are no items in your cart.</h3>")
    : (document.querySelector(".product-list").innerHTML = htmlItems.join(""));
  updateCartNumber();
  getAndRenderTotal();
}

// function getCartContents() {
//   // Get the cart items.
//   let cartItems;
//   try {
//     cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
//     if (!Array.isArray(cartItems)) cartItems = [cartItems];
//   } catch (err) {
//     cartItems = [];
//   }

//   // Render the items
//   const htmlItems = cartItems.map((item) => renderCartItem(item));
//   cartItems.length == 0
//     ? (document.querySelector(".product-list").innerHTML =
//         "<h3>There are no items in your cart.</h3>")
//     : (document.querySelector(".product-list").innerHTML = htmlItems.join(""));
//   updateCartNumber();
//   getAndRenderTotal();
// }

// function getAndRenderTotal() {
//   var cartItems = JSON.parse(localStorage.getItem("so-cart"));

//   var total = 0;
//   cartItems.forEach((element) => {
//     total += element.ListPrice;
//   });
//   console.log(total);

//   // rendering
//   document.querySelector(".cart-total").innerHTML = total;
//   document.querySelector(".cart-footer-hide").style.display = "block";
// }

// function eventListener(element, callback) {
//   element.addEventListener("touchend", (event) => {
//     event.preventDefault();
//     callback();
//   });
//   element.addEventListener("click", callback);
// }

// function removeItem(id) {
//   let cartItems = getLocalStorage("so-cart");

//   // Find the item in the cart
//   let itemIndex = -1;
//   for (var i = 0; i < cartItems.length; i++) {
//     if (cartItems[i].Id == id) {
//       itemIndex = i;
//       break;
//     }
//   }

//   // Remove the item
//   if (itemIndex < 0) {
//     console.log("ERROR: ID does not exist in the cart.");
//   }
//   else {
//     cartItems[i].quantity -= 1;
//     if (cartItems[i].quantity <= 0) cartItems.splice(itemIndex, 1);
//   }
//   setLocalStorage("so-cart", cartItems);

//   // Reload the cart
//   document.querySelector(".product-list").innerHTML = "";
//   getCartContents();

//   const removeButtons = [
//     ...document.querySelectorAll(".cart-card__remove-item"),
//   ];

//   removeButtons.forEach(function (item) {
//     item.addEventListener("click", (e) => {
//       removeItem(item.dataset.id, item.closest("li"));
//     });
//   });

//   updateCartNumber();
// }

// function renderCartItem(template, product) {
//   template.querySelector("a").href += product.Id;
//   template.querySelector("img").src = product.Images.PrimarySmall;
//   template.querySelector("img").alt += product.Name;
//   template.querySelector(".card__name").innerHTML = product.Name;
//   template.querySelector(".cart-card__color").innerHTML = product.Colors[0].ColorName;
//   template.querySelector(".cart-card__quantity").innerHTML += product.quantity;
//   template.querySelector(".cart-card__price").innerHTML += product.FinalPrice;
//   template.querySelector(".cart-card__remove-item").data.id = product.id
//   template.querySelector(".card__brand").innerHTML = product.Brand.Name;
//   template.querySelector(".product-card__price").innerHTML +=  product.ListPrice;

//   return template;
// }

// getCartContents();

// const removeButtons = [...document.querySelectorAll(".cart-card__remove-item")];
// removeButtons.forEach(function (item, idx) {
//   item.addEventListener("click", (e) => {
//     removeItem(item.dataset.id, item.closest("li"));
//   });
// });
// removeButtons.map((element) =>
//   eventListener(element, removeItem.bind(element.dataset.id))
// );
