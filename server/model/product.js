const products = [];

const getProducts = () => (products);

const getProductById = (id) => products.find((product) => product.id === id);

const createProduct = (product) => products.push(product);

const updateProduct = (product) => {
  const oldProduct = (element) => element.id === product.id;
  const index = products.findIndex(oldProduct);
  products[index] = product;
};

const deleteProduct = (id) => {
  const Product = (element) => element.id === id;
  const index = products.findIndex(Product);
  products.splice(index, 1);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
