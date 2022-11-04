const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
// const baseURL = 'http://157.201.228.93:2992/';
// covert response to json
function convertToJson(res) {
  const json = res.json()
  if (res.ok) {
    return json
  } else {
    throw { name: 'servicesError', message: json };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(id) {
    return await fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
