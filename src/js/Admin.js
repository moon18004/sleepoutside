import ExternalServices from "./ExternalServices.js";
import {
  removeAllAlerts,
  alertMessage,
  loadTemplate,
  renderwithTemplate,
  loadHeaderFooter,
  updateCartNumber,
} from "./utils.js";

await loadHeaderFooter();
updateCartNumber();

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    try {
      this.token = await this.services.loginRequest(creds);
      console.log(this.token);
      next();
    } catch (err) {
      removeAllAlerts();
      console.log(this.token);
      alertMessage(err.message.message);
    }
  }
  async showLogin() {
    const login = await loadTemplate("../partials/login-form.html");
    renderwithTemplate(this.mainElement, login);

    document.querySelector("#login-submit").addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#pwd").value;
      const creds = { email, password };
      console.log(creds);
      this.login(creds, this.showOrders.bind(this));
    });
  }
  async showOrders() {
    try {
      const orders = await this.services.getOrders(this.token);
      console.log(orders);
      const order = await loadTemplate("../partials/order-form.html");
      this.mainElement.innerHTML = "";
      renderwithTemplate(this.mainElement, order);

      const parent = document.querySelector(".order-list");
      // why not a template like we have done before?  The markup here was simple enough that I didn't think it worth the overhead...but a template would certainly work!
      parent.innerHTML = orders
        .map(
          (order) =>
            `<tr><td>${order.id}</td><td>${new Date(
              order.orderDate
            ).toLocaleDateString("en-US")}</td><td>${
              order.items.length
            }</td><td>${order.orderTotal}</td></tr>`
        )
        .join("");
    } catch (err) {
      console.log(err);
      alertMessage(err.message.message);
    }
  }
}

const admin = new Admin("main");
admin.showLogin();
