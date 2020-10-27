const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.post('/', controller.createUser);

router.get('/:userId', controller.getUser);

router.delete('/:userId', controller.deleteUser);

module.exports = router;
