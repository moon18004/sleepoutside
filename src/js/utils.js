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
export function renderList(list, id, hydrateFunction, ul) {
  const template = document.getElementById(id);
  ul.innerHTML = "";
  const filteredList = list.filter(
    (itme) => itme.Id != "989CG" && itme.Id != "880RT"
  );
  
  filteredList.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const hybratedTemplate = hydrateFunction(clone, product);
    ul.appendChild(hybratedTemplate);
  });
}
export function updateCartNumber() {
  if (getLocalStorage("so-cart") != null) {
    let length = getLocalStorage("so-cart").length;
    console.log(length);
    console.log(document.querySelector(".count"));
    document.querySelector(".count").innerHTML = length;
  } else {
    document.querySelector(".count").innerHTML = 0;
  }
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

export function newsletter(){
  //window.onload = function() {
    setTimeout(function() {
        document.querySelector('.newsletter').classList.add("newsletter-after");
        //.style.display = 'block';
    }, 1000);

    document.querySelector('.form_X').addEventListener("click", ()=>{
      document.querySelector('.newsletter').classList.remove("newsletter-after")
    })
  //}
}
