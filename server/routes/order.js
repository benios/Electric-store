const express = require('express');

const router = express.Router();
const controller = require('../controllers/order');

router.get('/', controller.getAllOrders);

router.post('/', controller.createOrder);

router.get('/orders/:orderId', controller.getOrder);

router.get('/usersOrders/:usersOrders', controller.getOrdersByUsername);

module.exports = router;
