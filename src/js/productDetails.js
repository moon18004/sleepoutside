import {
  setLocalStorage,
  animateBackpack,
  getLocalStorage,
  updateCartNumber,
  loadHeaderFooter,
} from "./utils";

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
    // let length = getLocalStorage("so-cart").length;
    // document.querySelector(".count").innerHTML = length;
    await loadHeaderFooter();
    updateCartNumber();
  }

  addToCart() {
    // Check to see if there is a cart. If not, create one.
    let cart_items;
    try {
      cart_items = JSON.parse(localStorage.getItem("so-cart")) || [];
      if (!Array.isArray(cart_items)) cart_items = [cart_items];
    } catch (err) {
      cart_items = [];
    }

    // If there is no count attribute, create it, and set it to one.
    
    // See if the cart already contains the item we have added.
    let matched_item;
    for (let item_index = 0; item_index < cart_items.length; item_index++) {
      let item = cart_items[item_index];
      console.log(item.Id)
      console.log(this.product.Id)
      if (item.Id == this.product.Id) matched_item = item_index;
    }
    
    // Increment the quantity if the item is already in the cart.
    if (matched_item != null) {
      cart_items[matched_item].quantity = cart_items[matched_item].quantity + 1;
    } else {
      if (!this.product?.quantity) this.product.quantity = 1;
      cart_items.push(this.product);
    }

    // Save it to local storage.
    setLocalStorage("so-cart", cart_items);
    updateCartNumber();
    animateBackpack();
  }

  renderProductDetails() {
    console.log(JSON.stringify(this.product, 0, 2))
    document.querySelector(
      ".product-detail"
    ).innerHTML = `<h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.Name}"
        />
        <p class="product-card__discount"></p>
        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;

    // If there is a dicount, add it to the page.
    if (this.product.SuggestedRetailPrice > this.product.ListPrice) {
      // Percentage Discount
      this.percentOff = Math.round(
        (100 * (this.product.SuggestedRetailPrice - this.product.ListPrice)) /
          this.product.SuggestedRetailPrice
      );
      document.querySelector(
        ".product-card__discount"
      ).innerHTML = `<span>${this.percentOff}% Off<span>`;
    }
    // Show discounted price
    document.querySelector(
      ".product-card__price"
    ).innerHTML = `<strike>Retail $${parseFloat(
      this.product.SuggestedRetailPrice
    ).toFixed(2)}</strike> <span>Retail $${this.product.ListPrice}</span>`;
    
    // Update the title of the page to reflect the product name.
    document.title += this.product.Name;
  }
}
