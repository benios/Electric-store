import axios from 'axios';
import get from 'lodash/get';



const API = {
  //USER
  signup: async (userName, password, firstName, lastName, address, age) => {
    try {
      const response = await  axios.post('/user',{userName, password, firstName, lastName, address, age});
    }catch (error) {
      console.error(error);
    }
  },
  login: async (userName, password) => {
    let response;
    try {
      response = await  axios.post('/user/login',{userName, password});
    }catch (error) {
      console.error(error);
    }
    return get(response, "data.foundUser");
  },

  //Product

  getProductByCategory: async (category) => {
    let products;
    try {
      products = await axios.get(`/product/categories/${category}`);
    }catch (error) {
      console.error(error);
    }
      return get(products, "data.foundProducts");
  },

  getProductById: async (productId) => {
    let product;
    try {
      product = await axios.get(`/product/${productId}`);
    }catch (error) {
      console.error(error);
    }
    return get(product, "data.foundProduct");
  },

  //Order

  createOrder: async (userName, products) => {
    try {
      const response = await axios.post('/order',{userName, products});
      console.log(response);
    }catch (error) {
      console.error(error);
    }
  }
};

export default API;
