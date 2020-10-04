const express = require('express');

const router = express.Router();
const controller = require('../controllers/product');

router.post('/', controller.createProduct);

router.get('/', controller.getProducts);

router.get('/:productId', controller.getProductById);

router.put('/:productId', controller.updateProduct);

router.delete('/:productId', controller.deleteProduct);

module.exports = router;
