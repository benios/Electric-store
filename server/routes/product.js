const express = require('express');
const controller = require('../controllers/product');
const checkAuth = require('../middleware/check-auth');
const role = require('../helpers/role');

const router = express.Router();

router.post('/', checkAuth.authUser, checkAuth.authRole(role.Admin), controller.createProduct);

router.get('/products', controller.getProductByViews);

router.get('/', controller.getProducts);

router.get('/:productId', controller.getProductById);


router.get('/categories/:category', controller.getProductByCategory);

router.patch('/productUpdate/:productId', controller.updateProduct);

router.patch('/:productId', checkAuth.authUser, checkAuth.authRole(role.Admin), controller.updateProduct);

router.delete('/:productId', checkAuth.authUser, checkAuth.authRole(role.Admin), controller.deleteProduct);

module.exports = router;
