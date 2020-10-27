const express = require('express');
const bodyParser = require('body-parser');
const productModel = require('../model/product');
const Logger = require('../services/logger_services');

const app = express();

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const newProductValidation = (product) => {
  if (!product.name) {
    throw new Error('name field is empty');
  }
  if ((typeof (product.price) !== 'number') || (product.price < 0)) {
    throw new Error('price field is not a number');
  }
  if ((typeof (product.quantity) !== 'number') || (product.quantity < 0)) {
    throw new Error('Quantity field is not a number');
  }
  if (!product.pictureUrl) {
    throw new Error('pictureUrl field is empty');
  }
  if (!product.description) {
    throw new Error('description field is empty');
  }
};

const createProduct = (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    date: Date.now(),
  };

  logger.info('handling create a product request', product);

  try {
    newProductValidation(product);
  } catch (err) {
    logger.error(err, product);
    return res.status(400).send('Error: creating a new product failed');
  }

  productModel.createProduct(product);
  logger.info('added product successfully', product);
  return res.send('added product successfully');
};

const getProducts = (req, res) => {
  const allProducts = productModel.getProducts();
  logger.info('fetching the products', allProducts);
  return res.status(200).json({
    message: 'fetching the products',
    allProducts,
  });
};

const getProductById = (req, res) => {
  const id = Number(req.params.productId);
  const product = productModel.getProductId(id);
  if (!product) {
    return res.status(404).json({
      message: 'product id does not exist',
    });
  }
  logger.info(`fetching product with id: ${id}`, product);
  return res.status(200).json({
    message: `fetching product with id: ${id}`,
    product,
  });
};

const updateProduct = (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    date: new Date(),
    id: Number(req.params.productId),
  };
  const isIdValid = productModel.updateProduct(product);
  if (!isIdValid) {
    return res.status(404).json({
      message: 'product id does not exist, updating the product failed',
    });
  }
  logger.info('Updated product!', product);
  return res.status(200).json({
    message: 'Updated product!',
    product,
  });
};

const deleteProduct = (req, res) => {
  const id = Number(req.params.productId);
  const didProductDeleted = productModel.deleteProduct(id);
  if (!didProductDeleted) {
    return res.status(404).json({
      message: 'product id does not exist, deleting the product failed',
    });
  }
  logger.info('Deleted product!');
  return res.status(200).json({
    message: 'Deleted product!',
  });
};

module.exports = {
  deleteProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProducts,
};
