import { renderList, updateCartNumber, loadHeaderFooter } from "./utils.js";

export default class ProductListing {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    let sort = document.querySelector("#sortBy").value;
    console.log(sort);
    const sorted_list = list.sort(
      (a, b) => { let nameA = a.NameWithoutBrand.toLowerCase();
                  let nameB = b.NameWithoutBrand.toLowerCase();
                if (nameA < nameB) return -1;
                else if(nameA > nameB) return 1;
                else return 0;})
    const sorted_by_price = list.sort(
      (a, b) => { let nameA = a.ListPrice;
                  let nameB = b.ListPrice;
                if (nameA < nameB) return -1;
                else if(nameA > nameB) return 1;
                else return 0;})
    console.log(sorted_by_price);
    // renderList(
    //   list,
    //   "product-card-template",
    //   this.prepareTemplate,
    //   this.element
    // );
    
    await loadHeaderFooter();
    updateCartNumber();
    
    document.querySelector('#sortBy').addEventListener('change', () => {
      renderList(
        list,
        "product-card-template",
        this.prepareTemplate,
        this.element
      );
    });

    // renderList(
    //   list,
    //   "product-card-template",
    //   this.prepareTemplate,
    //   this.element
    // )
    console.log(document.querySelector('#sortBy').value)
    
  }
  // renderList(list){
  //   this.element.innerHTML = "";
  //   const template = document.querySelector("#product-card-template");
  //   renderListWithTemplate(template, this.element, list, this.prepareTemplate);
  // }
  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Images.PrimaryMedium;
    template.querySelector("img").alt += product.Name;
    template.querySelector(".card__brand").innerHTML = product.Brand.Name;
    template.querySelector(".card__name").innerHTML = product.NameWithoutBrand;
    template.querySelector(".product-card__price").innerHTML +=
      product.ListPrice;

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



