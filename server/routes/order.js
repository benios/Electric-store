const express = require('express');
const controller = require('../controllers/order');

const router = express.Router();

router.get('/', controller.getAllOrders);

router.post('/', controller.createOrder);

router.get('/orders/:orderId', controller.getOrder);

router.get('/usersOrders/:user', controller.getOrdersByUsername);

module.exports = router;
