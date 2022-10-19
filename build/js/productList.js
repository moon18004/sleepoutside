var o = (n, e, r) =>
  new Promise((a, s) => {
    var u = (t) => {
        try {
          i(r.next(t));
        } catch (c) {
          s(c);
        }
      },
      d = (t) => {
        try {
          i(r.throw(t));
        } catch (c) {
          s(c);
        }
      },
      i = (t) => (t.done ? a(t.value) : Promise.resolve(t.value).then(u, d));
    i((r = r.apply(n, e)).next());
  });
import { renderList as l, updateCartNumber as m } from "./utils.js";
export default class h {
  constructor(e, r, a) {
    (this.category = e), (this.dataSource = r), (this.element = a);
  }
  init() {
    return o(this, null, function* () {
      const e = yield this.dataSource.getData();
      l(e, "product-card-template", this.prepareTemplate, this.element), m();
    });
  }
  prepareTemplate(e, r) {
    return (
      (e.querySelector("a").href += r.Id),
      (e.querySelector("img").src = r.Image),
      (e.querySelector("img").alt += r.Name),
      (e.querySelector(".card__brand").innerHTML = r.Brand.Name),
      (e.querySelector(".card__name").innerHTML = r.NameWithoutBrand),
      (e.querySelector(".product-card__price").innerHTML += r.ListPrice),
      e
    );
  }
}
