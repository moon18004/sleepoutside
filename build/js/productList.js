import { renderList, updateCartNumber, loadHeaderFooter } from "./utils.js";

export default class ProductListing {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }
  async init() {
    const list = await this.dataSource.getData();
    renderList(
      list,
      "product-card-template",
      this.prepareTemplate,
      this.element
    );
    await loadHeaderFooter();
    updateCartNumber();
  }
  // renderList(list){
  //   this.element.innerHTML = "";
  //   const template = document.querySelector("#product-card-template");
  //   renderListWithTemplate(template, this.element, list, this.prepareTemplate);
  // }
  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Image;
    template.querySelector("img").alt += product.Name;
    template.querySelector(".card__brand").innerHTML = product.Brand.Name;
    template.querySelector(".card__name").innerHTML = product.NameWithoutBrand;
    template.querySelector(".product-card__price").innerHTML +=
      product.ListPrice;
    return template;
  }
}
