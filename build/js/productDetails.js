var i = (o, t, r) =>
  new Promise((s, e) => {
    var u = (d) => {
        try {
          a(r.next(d));
        } catch (c) {
          e(c);
        }
      },
      p = (d) => {
        try {
          a(r.throw(d));
        } catch (c) {
          e(c);
        }
      },
      a = (d) => (d.done ? s(d.value) : Promise.resolve(d.value).then(u, p));
    a((r = r.apply(o, t)).next());
  });
import {
  setLocalStorage as l,
  animateBackpack as h,
  getLocalStorage as n,
  updateCartNumber as m,
} from "./utils.js";
export default class g {
  constructor(t, r) {
    (this.productId = t), (this.product = {}), (this.dataSource = r);
  }
  init() {
    return i(this, null, function* () {
      (this.product = yield this.dataSource.findProductById(this.productId)),
        this.renderProductDetails(),
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addToCart.bind(this));
      let t = n("so-cart").length;
      document.querySelector(".count").innerHTML = t;
    });
  }
  addToCart() {
    let t;
    try {
      (t = JSON.parse(localStorage.getItem("so-cart")) || []),
        Array.isArray(t) || (t = [t]);
    } catch (r) {
      t = [];
    }
    t.push(this.product), l("so-cart", t), m(), h();
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
