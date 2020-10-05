const products = [];

const getProducts = () => (products);

const getProductById = (id) => products.find((product) => product.id === id);

const createProduct = (product) => products.push(product);

const updateProduct = (product) => {
  const index = products.findIndex((element) => element.id === product.id);
  products[index] = product;
};

const deleteProduct = (id) => {
  const index = products.findIndex((element) => element.id === id);
  products.splice(index, 1);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
