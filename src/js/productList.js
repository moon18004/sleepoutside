import { renderList, updateCartNumber, loadHeaderFooter, loadTemplate } from "./utils.js";

export default class ProductListing {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    const template = await loadTemplate("../partials/productCard.html");
    renderList(this.element, template, list, this.prepareTemplate, true);
    await loadHeaderFooter();
    updateCartNumber();

    console.log(document.querySelector("#sortBy").value);
  }
  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Images.PrimaryMedium;
    template.querySelector("img").alt += product.Name;
    template.querySelector(".card__brand").innerHTML = product.Brand.Name;
    template.querySelector(".card__name").innerHTML = product.NameWithoutBrand;
    template.querySelector(".product-card__price").innerHTML +=  product.ListPrice;

    if (product.SuggestedRetailPrice > product.ListPrice) {
      let percentOff = Math.round(
        (100 * (product.SuggestedRetailPrice - product.ListPrice)) /
          product.SuggestedRetailPrice
      );
      template.querySelector(
        ".product-card__discount"
      ).innerHTML = `${percentOff}% Off`;
    }

    return template;
  }
}
