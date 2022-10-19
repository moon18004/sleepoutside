export function qs(t, e = document) {
  return e.querySelector(t);
}
export function getLocalStorage(t) {
  return JSON.parse(localStorage.getItem(t));
}
export function setLocalStorage(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
export function setClick(t, e) {
  qs(t).addEventListener("touchend", (n) => {
    n.preventDefault(), e();
  }),
    qs(t).addEventListener("click", e);
}
export function getParam(t) {
  const e = window.location.search,
    n = new URLSearchParams(e),
    o = n.get(t);
  return o;
}
export function animateBackpack() {
  var t = document.querySelector(".cart");
  t.classList.add("anim-out"),
    setTimeout(() => {
      t.classList.remove("anim-out");
    }, 300);
}
export function renderList(t, e, n, o) {
  const c = document.getElementById(e);
  o.innerHTML = "";
  const a = t.filter((r) => r.Id != "989CG" && r.Id != "880RT");
  a.forEach((r) => {
    const i = c.content.cloneNode(!0),
      u = n(i, r);
    o.appendChild(u);
  });
}
export function updateCartNumber() {
  let t = getLocalStorage("so-cart").length;
  document.querySelector(".count").innerHTML = t;
}
