import { getLocalStorage, setLocalStorage, updateCartNumber } from "./utils.js";

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

// function getAndRenderTotal(){
//  var cartItems = JSON.parse(localStorage.getItem("so-cart"));
//  var listPrices = cartItems.ListPrice;
//  var total = 0;

//  total += listPrices;

//  for (const item of cartItems) {
//   total += listPrices;
//  }
//  console.log(total)

//  // rendering
//  document.querySelector(".cart-total").innerHTML = total


// };

function eventListener(element, callback) {
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

function removeItem(id) {
  let cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  console.log(id);
  // Figure out how to get the id in here
  // Find the item in the cart
  let itemId = -1;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id == id) {
      itemId = i;
      break;
    }
  }
  console.log(itemId);

  // Remove the item
  if (itemId < 0) {
    console.log("ERROR: ID does not exist in the cart.");
  } else {
    cartItems.splice(itemId, 1);
  }
  setLocalStorage("so-cart", cartItems);

  // Reload the cart
  document.querySelector(".product-list").innerHTML = "";
  getCartContents();
  const removeButtons = [
    ...document.querySelectorAll(".cart-card__remove-item"),
  ];
  removeButtons.forEach(function (item, idx) {
    item.addEventListener("click", (e) => {
      removeItem(item.dataset.id, item.closest("li"));
    });
  });
  updateCartNumber();
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="product_pages/product-details.html?product=${item.Id}" class="cart-card__image">
  <img
  src="${item.Image}"
  alt="${item.Name}"
  />
  </a>
  <a href="#">
  <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <div class="cart-card__remove-item" data-id="${item.Id}">
    <p>X</p>
    <p>Remove Item</p>
  </div>
</li>`;
  return newItem;
}

getCartContents();

const removeButtons = [...document.querySelectorAll(".cart-card__remove-item")];
removeButtons.forEach(function (item, idx) {
  item.addEventListener("click", (e) => {
    removeItem(item.dataset.id, item.closest("li"));
  });
});
removeButtons.map((element) =>
  eventListener(element, removeItem.bind(element.dataset.id))
);
