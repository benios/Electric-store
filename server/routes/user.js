const express = require('express');

const router = express.Router();
const controller = require('../controllers/user');

router.post('/', controller.createUser);

router.get('/:userId', controller.getUser);

router.delete('/:userId', controller.deleteUser);

module.exports = router;
