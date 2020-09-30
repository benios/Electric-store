const products = [];

const getProducts = () => (products);

const getProductId = (id) => products.find(product => product.id === id);

const createProduct = (product) => {products.push(product)};

const updateProduct = (product) => {
    let oldProduct = (element) => element.id === product.id;
    let index = products.findIndex(oldProduct);
    products[index]= product;
};

const deleteProduct = (id) => {
    let Product = (element) => element.id === id;
    let index = products.findIndex(Product);
    products.splice(index,1);
};

module.exports = {
    getProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
}
