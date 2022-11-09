// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get param from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function animateBackpack() {
  var cartImg = document.querySelector(".cart");
  cartImg.classList.add("anim-out");
  setTimeout(() => {
    cartImg.classList.remove("anim-out");
  }, 300);
}

export function sortList(list, template, callback, ul) {
  let sort = document.querySelector("#sortBy").value;
  // console.log(template);
  ul.innerHTML = "";
  switch (sort) {
    case "sortByName":
      const sorted_by_name = list.sort((a, b) => {
        let nameA = a.NameWithoutBrand.toLowerCase();
        let nameB = b.NameWithoutBrand.toLowerCase();
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
      sorted_by_name.forEach((product) => {
        let clone = template.content.cloneNode(true);
        let hybratedTemplate = callback(clone, product);
        ul.appendChild(hybratedTemplate);
      });
      break;
    case "sortByPrice":
      const sorted_by_price = list.sort((a, b) => {
        let nameA = a.ListPrice;
        let nameB = b.ListPrice;
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
      sorted_by_price.forEach((product) => {
        let clone = template.content.cloneNode(true);
        let hybratedTemplate = callback(clone, product);
        ul.appendChild(hybratedTemplate);
      });
      break;
  }
}

export function searchItem(input, list, template, callback, ul) {
  let result_list = list.filter((item) => {
    const name = item.NameWithoutBrand;
    if (name.toLowerCase().indexOf(input.toLowerCase()) != -1) {
      return item;
    }
  });
  ul.innerHTML = "";
  result_list.forEach((product) => {
    let clone = template.content.cloneNode(true);
    let hybratedTemplate = callback(clone, product);
    ul.appendChild(hybratedTemplate);
  });
}

export function renderList(ul, template, list, hydrateFunction, clear) {
  // Empty the list if the list should be emptied
  if (clear) ul.innerHTML = "";

  list.forEach((item) => {
    renderwithTemplate(ul, template, item, hydrateFunction);
  });
}

// let sort = document.querySelector("#sortBy").value;
// switch(sort){
//   case "sortByName":
//     const sorted_by_name = list.sort(
//       (a, b) => { let nameA = a.NameWithoutBrand.toLowerCase();
//                   let nameB = b.NameWithoutBrand.toLowerCase();
//                 if (nameA < nameB) return -1;
//                 else if(nameA > nameB) return 1;
//                 else return 0;})
//     sorted_by_name.forEach((product) => {
//       let clone = template.content.cloneNode(true);
//       let hybratedTemplate = hydrateFunction(clone, product);
//       ul.appendChild(hybratedTemplate);
//     });
//   case "sortByPrice":
//     const sorted_by_price = list.sort(
//       (a, b) => { let nameA = a.ListPrice;
//                   let nameB = b.ListPrice;
//                 if (nameA < nameB) return -1;
//                 else if(nameA > nameB) return 1;
//                 else return 0;})
//     sorted_by_price.forEach((product) => {
//       let clone = template.content.cloneNode(true);
//       let hybratedTemplate = hydrateFunction(clone, product);
//       ul.appendChild(hybratedTemplate);
//     });
// }
// }

export function updateCartNumber() {
  const items = getLocalStorage("so-cart");
  let quantity = 0;
  if (items != null) {
    items.forEach(function (item) {
      quantity += item.quantity;
    });
    document.querySelector(".count").innerHTML = quantity;
  } else {
    document.querySelector(".count").innerHTML = 0;
  }
  console.log(quantity);
}

export function renderwithTemplate(parent_node, template, data, callback) {
  let copy = template.content.cloneNode(true);

  if (callback) {
    copy = callback(copy, data);
  }

  parent_node.appendChild(copy);
}

export async function loadTemplate(path) {
  const data = await fetch(path);
  const template = await data.text();

  const newTemplate = document.createElement("template");
  newTemplate.innerHTML = template;

  return newTemplate;
}

export async function loadHeaderFooter() {
  const footer = await loadTemplate("../partials/footer.html");
  const header = await loadTemplate("../partials/header.html");

  const head = document.querySelector("header");
  const foot = document.querySelector("footer");

  renderwithTemplate(head, header);
  renderwithTemplate(foot, footer);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      //console.log(e);
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
