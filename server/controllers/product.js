const express = require('express');
const bodyParser = require('body-parser');
const Product = require('../model/product');
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
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    pictureUrl: req.body.pictureUrl,
    description: req.body.description,
    date: Date.now(),
  });

  logger.info('handling create a product request', product);

  try {
    newProductValidation(product);
  } catch (err) {
    logger.error(err, product);
    return res.status(400).send('Error: creating a new product failed');
  }
  product.save();
  logger.info('added product successfully', product);
  return res.send('added product successfully');
};

const getProducts = (req, res) => {
  Product.find()
    .exec()
    .then((foundProducts) => {
      if (!foundProducts) {
        return res.status(404).json({
          message: 'There are no products to fetch',
        });
      }
      logger.info('Fetching all products');
      return res.status(200).json({
        message: 'Products details',
        foundProducts,
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

const getProductById = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((foundProduct) => {
      if (!foundProduct) {
        return res.status(404).json({
          message: 'Product id does not exist',
        });
      }
      logger.info(`Product with ${id} id was fetched`, foundProduct);
      return res.status(200).json({
        message: 'Product details',
        foundProduct,
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

const updateProduct = (req, res) => {
  const id = req.params.productId;
  const props = req.body;
  Product.update({ _id: id }, props)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Failed to find and update the product',
        });
      }
      logger.info(`Product with ${id} id was updated`, result);
      return res.status(200).json({
        message: 'successfully updated the product',
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

const deleteProduct = (req, res) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Failed to find and delete the product',
        });
      }
      logger.info(`Product with ${id} id was deleted`, result);
      return res.status(200).json({
        message: 'successfully deleted the product',
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(500).json({
        message: err,
      });
    });
};

module.exports = {
  deleteProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProducts,
};
