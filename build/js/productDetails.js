var s=(i,t,r)=>new Promise((e,o)=>{var u=d=>{try{a(r.next(d))}catch(c){o(c)}},p=d=>{try{a(r.throw(d))}catch(c){o(c)}},a=d=>d.done?e(d.value):Promise.resolve(d.value).then(u,p);a((r=r.apply(i,t)).next())});import{setLocalStorage as l,animateBackpack as h}from"./utils.js";export default class n{constructor(t,r){this.productId=t,this.product={},this.dataSource=r}init(){return s(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){let t;try{t=JSON.parse(localStorage.getItem("so-cart"))||[],Array.isArray(t)||(t=[t])}catch(r){t=[]}t.push(this.product),l("so-cart",t),h()}renderProductDetails(){document.querySelector(".product-detail").innerHTML=`<h3>${this.product.Brand.Name}</h3>
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
        </div>`}}
