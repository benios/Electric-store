const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.post('/', controller.createUser);

router.post('/login', controller.loginUser);

router.delete('/:userId', controller.deleteUser);

module.exports = router;
