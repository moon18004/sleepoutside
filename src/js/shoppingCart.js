import { setLocalStorage, updateCartNumber, renderList, loadTemplate, getLocalStorage } from "./utils.js";

function getCartContents(parent, template, callback) {
    // Get the cart items.
    let cartItems;
    try {
        cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
        if (!Array.isArray(cartItems)) cartItems = [cartItems];
    } catch (err) {
        cartItems = [];
    }

    // Render the items
    if (cartItems.length == 0) {
        document.querySelector(".product-list").innerHTML = "<h3>There are no items in your cart.</h3>"
    }
    else {
        renderList(parent, template, cartItems, callback, true);
    }

    // Update the cart number at the top, and render the total below
    updateCartNumber();
    getAndRenderTotal();
}

async function removeItem(id) {
    // console.log(id)
    const listElement = document.querySelector(".product-list");
    const template = await loadTemplate("../partials/cartItem.html");
    let cartItems = getLocalStorage("so-cart");

    // Find the item in the cart
    let itemIndex = -1;
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].Id == id) {
          itemIndex = i;
          break;
        }
    }

    // Remove the item
    if (itemIndex < 0) {
        console.log("ERROR: ID does not exist in the cart.");
    } 
    else {
        cartItems[i].quantity -= 1;
        if (cartItems[i].quantity <= 0) cartItems.splice(itemIndex, 1);
    }
    setLocalStorage("so-cart", cartItems);

    // Reload the cart
    document.querySelector(".product-list").innerHTML = "";
    getCartContents(listElement, template, renderCartItem);

    const removeButtons = [
        document.querySelectorAll(".cart-card__remove-item")
    ];

    removeButtons.forEach(function (item) {
        item.addEventListener("click", (e) => {
          removeItem(item.dataset.id), item.closest("li");
        });
    });

    removeButtons.map((element) =>
      eventListener(element, removeItem.bind(element.dataset.id))
    );

    
    updateCartNumber();
}

function renderCartItem(template, product) {

    console.log(JSON.stringify(product, 0, 2))
    // console.dir(template.querySelector(".cart-card__color"))
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Images.PrimarySmall;
    template.querySelector("img").alt += product.Name;
    template.querySelector(".card__name").innerHTML = product.Name;
    template.querySelector(".cart-card__color").innerHTML = product.Colors[0].ColorName;
    template.querySelector(".cart-card__quantity").innerHTML += product.quantity;
    template.querySelector(".cart-card__price").innerHTML += product.FinalPrice;
    template.querySelector(".cart-card__remove-item").dataset.id = product.id;

    return template;
}

function eventListener(element, callback) {
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

function getAndRenderTotal() {
  var cartItems = JSON.parse(localStorage.getItem("so-cart"));

  var total = 0;
  cartItems.forEach((element) => {
    total += element.ListPrice;
  });

  // rendering
  document.querySelector(".cart-total").innerHTML = total;
  document.querySelector(".cart-footer-hide").style.display = "block";
}

export default class ShoppingCart {
  constructor() {
      this.templatePath = "../partials/cartItem.html";
      this.listElement = document.querySelector(".product-list");
  }

  async init() {
    const template = await loadTemplate(this.templatePath);

    // Set up the cart 
    getCartContents(this.listElement, template, renderCartItem);

    // Set up the remove buttons.
    const removeButtons = [...document.querySelectorAll(".cart-card__remove-item")];
    removeButtons.forEach(function (item, idx) {
    item.addEventListener("click", (e) => {
      removeItem(item.dataset.id,  item.closest("li"));
    });
    });
  }
}