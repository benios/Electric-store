const utils = require('../utils/utils');

const products = [];

const getProducts = () => (products);

const getProductById = (id) => {
  if (products.some((e) => e.id === id)) {
    return products.find((product) => product.id === id);
  }
  return false;
};

const createProduct = (product) => {
  const id = utils.idGenerator.generateId();
  products.push({ ...product, id });
};

const updateProduct = (product) => {
  if (products.some((e) => e.id === product.id)) {
    const index = products.findIndex((element) => element.id === product.id);
    products[index] = product;
    return true;
  }
  return false;
};

const deleteProduct = (id) => {
  if (products.some((e) => e.id === id)) {
    const index = products.findIndex((element) => element.id === id);
    products.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
