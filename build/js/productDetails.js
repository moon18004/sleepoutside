var s=(a,t,r)=>new Promise((e,c)=>{var u=d=>{try{i(r.next(d))}catch(o){c(o)}},p=d=>{try{i(r.throw(d))}catch(o){c(o)}},i=d=>d.done?e(d.value):Promise.resolve(d.value).then(u,p);i((r=r.apply(a,t)).next())});import{setLocalStorage as l}from"./utils.js";export default class h{constructor(t,r){this.productId=t,this.product={},this.dataSource=r}init(){return s(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){let t;try{t=JSON.parse(localStorage.getItem("so-cart"))||[],Array.isArray(t)||(t=[t])}catch(r){t=[]}t.push(this.product),l("so-cart",t)}renderProductDetails(){document.querySelector(".product-detail").innerHTML=`<h3>${this.product.Brand.Name}</h3>
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
