const express = require('express');
const bodyParser = require('body-parser');
const productModel = require('../model/product');

const app = express();

const Logger = require('../services/logger_services');

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const idGeneretor = {
  lastId: 0,
  generateId() {
    this.lastId += 1;
    return this.lastId;
  },
};

const createProduct = (req, res) => {
  const error = {};
  const product = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    date: new Date(Date.now()).toLocaleString(),
    id: idGeneretor.generateId(),
  };

  logger.info('handling create a product request', product);

  if (product.name === null || product.name === '') {
    logger.error('name field is empty', product);
  }
  const priceValidationRegEx = /^([0-9])+$/;
  const isPriceValid = priceValidationRegEx.test(product.price);
  if (!isPriceValid) {
    logger.error('price field is not a number', product);
  }
  const quantityValidationRegEx = /^([0-9])+$/;
  const isQuantityValid = quantityValidationRegEx.test(product.quantity);
  if (!isQuantityValid) {
    logger.error('Quantity field is not a number', product);
  }
  if (product.pictureUrl === null || product.pictureUrl === '') {
    logger.error('pictureUrl field is empty', product);
  }
  if (product.description === null || product.description === '') {
    logger.error('description field is empty', product);
  }
  if (Object.keys(error).length > 0) {
    logger.error('adding product failed', product);
    return res.send('adding product failed');
  }
  productModel.createProduct(product);
  logger.info('added product seccessfully', product);
  return res.send('added product seccessfully');
};

const getProducts = (req, res) => {
  const allProducts = productModel.getProducts();
  logger.info('Handling GET requests to /product', allProducts);
  res.status(200).json({
    message: 'Handling GET requests to /product',
    allProducts,
  });
};

const getProductById = (req, res) => {
  const id = Number(req.params.productId);
  const product = productModel.getProductId(id);

  logger.info(`Handling GET requests to /product/${id}`, product);
  res.status(200).json({
    message: `Handling GET requests to /product/${id}`,
    product,
  });
};

const updateProduct = (req, res) => {
  const id = Number(req.params.productId);
  const product = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    date: new Date(Date.now()).toLocaleString(),
    id,
  };
  productModel.updateProduct(product);
  logger.info('Updated product!', product);
  res.status(200).json({
    message: 'Updated product!',
    product,
  });
};

const deleteProduct = (req, res) => {
  const id = Number(req.params.productId);
  const deletedProduct = productModel.deleteProduct(id);
  logger.info('Deleted product!', deletedProduct);
  res.status(200).json({
    message: 'Deleted product!',
    deletedProduct,
  });
};

module.exports = {
  deleteProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProducts,
};
