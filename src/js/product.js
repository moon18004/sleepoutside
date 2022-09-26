let products = [];
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// get tents data
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {

  let cart_items;
  // Don't break, don't break, don't break, don't break, don't break, don't break, don't break, don't break, don't break.
  try {
    cart_items = JSON.parse(localStorage.getItem("so-cart")) || [];
    if (!Array.isArray(cart_items)) cart_items = [cart_items];
  } catch (err) {
    // If there is a problem, then don't worry be happy.
    cart_items = [];
  }

  const product = products.find((item) => item.Id === e.target.dataset.id);
  if (!product?.count) product.count = 1;

  // Add the item to the list.
  cart_items.push(product);

  // Save it to local storage.
  setLocalStorage("so-cart", cart_items);

  // This is code for a version that would add a count to each item in the cart.
  // This would stop multiple copies of the same data being added to local storage.
  //
  // if the tent is already in the cart, increment the count instead of adding a new object to the array
  // let matched_item;
  // for (let item_index = 0; item_index < cart_items.length; item_index++) {
  //   let item = cart_items[item_index];
  //   if (item.id == product.id) matched_item = item_index;
  // }
  // if (matched_item) {
  //   cart_items[matched_item].count = cart_items[matched_item].count + 1;
  // } else {
  //   cart_items.push(product);
  // }
}

getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);