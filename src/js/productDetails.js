import { setLocalStorage, animateBackpack } from "./utils";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Don't break, don't break, don't break, don't break, don't break, don't break, don't break, don't break, don't break.
    let cart_items;
    try {
      cart_items = JSON.parse(localStorage.getItem("so-cart")) || [];
      if (!Array.isArray(cart_items)) cart_items = [cart_items];
    } catch (err) {
      cart_items = [];
    }

    // if (!product?.count) product.count = 1;

    // Add the item to the list.
    cart_items.push(this.product);

    // Save it to local storage.
    setLocalStorage("so-cart", cart_items);
    animateBackpack();

    // This is code for a version that would add a count to each item in the cart.
    // This would stop multiple copies of the same data being added to local storage.
    //
    // if the tent is already in the cart, increment the count instead of adding a new object to the array
    // let matched_item;
    // for (let item_index = 0; item_index < cart_items.length; item_index++) {
    //   let item = cart_items[item_index];
    //   if (item.id == product.id) matched_item = item_index;
    // }
    // if (matched_item) {
    //   cart_items[matched_item].count = cart_items[matched_item].count + 1;
    // } else {
    //   cart_items.push(product);
    // }
  }

  renderProductDetails() {
    document.querySelector(
      ".product-detail"
    ).innerHTML = `<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.Name}"
        />

        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;
  }
}
