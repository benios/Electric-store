const express = require('express');
const controller = require('../controllers/product');

const router = express.Router();

router.post('/', controller.createProduct);

router.get('/', controller.getProducts);

router.get('/:productId', controller.getProductById);

router.put('/:productId', controller.updateProduct);

router.delete('/:productId', controller.deleteProduct);

module.exports = router;
