const express = require("express");
const router = express.Router();
const controller = require("../controllers/order");



router.get("/", controller.getAllOrders);

router.post("/", controller.createOrder);

router.get("/:orderId", controller.getOrder);

 



module.exports = router;
