import {
  getLocalStorage as i,
  setLocalStorage as u,
  updateCartNumber as s,
} from "./utils.js";
function n() {
  let e = "",
    t;
  try {
    (t = JSON.parse(localStorage.getItem("so-cart")) || []),
      Array.isArray(t) || (t = [t]);
  } catch (c) {
    t = [];
  }
  console.log(t);
  const r = t.map((c) => p(c));
  t.length == 0
    ? (document.querySelector(".product-list").innerHTML =
        "<h3>There are no items in your cart.</h3>")
    : (document.querySelector(".product-list").innerHTML = r.join("")),
    s();
}
function m(e, t) {
  e.addEventListener("touchend", (r) => {
    r.preventDefault(), t();
  }),
    e.addEventListener("click", t);
}
function o(e) {
  let t = i("so-cart");
  console.log(t), console.log(e);
  let r = -1;
  for (var c = 0; c < t.length; c++)
    if (t[c].Id == e) {
      r = c;
      break;
    }
  console.log(r),
    r < 0
      ? console.log("ERROR: ID does not exist in the cart.")
      : t.splice(r, 1),
    u("so-cart", t),
    (document.querySelector(".product-list").innerHTML = ""),
    n();
  const d = [...document.querySelectorAll(".cart-card__remove-item")];
  d.forEach(function (a, g) {
    a.addEventListener("click", (v) => {
      o(a.dataset.id, a.closest("li"));
    });
  }),
    s();
}
function p(e) {
  const t = `<li class="cart-card divider">
  <a href="product_pages/product-details.html?product=${e.Id}" class="cart-card__image">
  <img
  src="${e.Image}"
  alt="${e.Name}"
  />
  </a>
  <a href="#">
  <h2 class="card__name">${e.Name}</h2>
  </a>
  <p class="cart-card__color">${e.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${e.FinalPrice}</p>
  <div class="cart-card__remove-item" data-id="${e.Id}">
    <p>X</p>
    <p>Remove Item</p>
  </div>
</li>`;
  return t;
}
n();
const l = [...document.querySelectorAll(".cart-card__remove-item")];
l.forEach(function (e, t) {
  e.addEventListener("click", (r) => {
    o(e.dataset.id, e.closest("li"));
  });
}),
  l.map((e) => m(e, o.bind(e.dataset.id)));
