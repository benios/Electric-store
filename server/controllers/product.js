const express = require('express');
const bodyParser = require('body-parser');
const productModel = require('../model/product');

const app = express();

const Logger = require('../services/logger_services');

const logger = new Logger('app');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

  if (!product.name) {
    logger.error('name field is empty', product);
    return res.send('name field is empty');
  }
  if (!(typeof (product.price) === 'number') || !(product.price >= 0)) {
    logger.error('price field is not a number', product);
    return res.send('price field is not a number');
  }
  if (!(typeof (product.quantity) === 'number') || !(product.quantity >= 0)) {
    logger.error('Quantity field is not a number', product);
    return res.send('Quantity field is not a number');
  }
  if (!product.pictureUrl) {
    logger.error('pictureUrl field is empty', product);
    return res.send('pictureUrl field is empty');
  }
  if (!product.description) {
    logger.error('description field is empty', product);
    return res.send('description field is empty');
  }
  productModel.createProduct(product);
  logger.info('added product seccessfully', product);
  return res.send('added product seccessfully');
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
  const id = Number(req.params.productId);
  const product = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    date: new Date(),
    id,
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
  const deletedProduct = productModel.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({
      message: 'product id does not exist, deleting the product failed',
    });
  }
  logger.info('Deleted product!', deletedProduct);
  return res.status(200).json({
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
