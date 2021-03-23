const express = require('express');
const controller = require('../controllers/order');
const checkAuth = require('../middleware/check-auth');
const role = require('../helpers/role');

const router = express.Router();

router.get('/', checkAuth.authUser, checkAuth.authRole(role.Admin), controller.getAllOrders);

router.post('/', checkAuth.authUser, checkAuth.authRole(role.User), controller.createOrder);

router.get('/orders/:orderId', checkAuth.authUser, checkAuth.authRole(role.User), controller.getOrder);

router.get('/userOrders', checkAuth.authUser, checkAuth.authRole(role.User), checkAuth.userPermissionByUsername, controller.getUserOrders);

module.exports = router;
