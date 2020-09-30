const express = require ("express");
const bodyParser = require("body-parser");
const ordersModel = require("../model/order");

const app = express();

const Logger = require('../services/logger_services'); 
const logger = new Logger('app');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const idGeneretor = {
    lastId: 0,
    generateId: function() {
        return ++(this.lastId);
    },
};  

function dateGenerator() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0");
	let yyyy = today.getFullYear();

	today = dd + "/" + mm + "/" + yyyy;
	return today;
}

const getAllOrders = (req, res) => { 
    const ordersList = ordersModel.getAllOrders();
    logger.setLogData(ordersList);
    logger.info("Orders were fetched");
    res.status(200).json({
        message: "Orders were fetched",
        ordersList
    });
};

const createOrder = (req, res) => { 
    const body = req.body;
    let error = {};
    const order = {
        userName: body.userName,
        product: body.product,
        date: dateGenerator(),
        id: idGeneretor.generateId(),
    }
   
    logger.setLogData(order);
    logger.info("request recieved at /order");

    if (body.userName == null || body.userName == ""){
        logger.error("username field is empty");
        error["username"] = "username field is empty";
    };
    if (body.product == null || body.product == ""){
        logger.error("product field is empty");
        error["product"] = "product field is empty";
    };
    if(Object.keys(error).length !=0){
        logger.error("creating a new order failed"),{
            "success":false
        }
        res.send("Error")
    }else{
        ordersModel.createOrder(order);
        logger.info("Orders were created"),{
            "success":true 
        }
        res.status(201).json({
            message: "Orders were created",
            createdOrder: order
        });
    }

};

const getOrder = (req, res) => { 
    const id = Number(req.params.orderId);
    const order = ordersModel.getOrder(id);
    logger.setLogData(order);
    logger.info("order with " + id + " id was fetched");
    res.status(200).json({
        message: "Order details",
        order
    });
};

module.exports = {
    getOrder,
    createOrder,
    getAllOrders,
};