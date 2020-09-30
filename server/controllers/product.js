const express = require("express");
const bodyParser = require("body-parser");
const productsModel = require("../model/product");

const app = express();

const Logger = require("../services/logger_services");
const logger = new Logger("app");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const idGeneretor = {
	lastId: 0,
	generateId: function () {
		return ++this.lastId;
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

const createProduct = (req, res) => {
	let error = {};
	const product = {
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.quantity,
		pictureUrl: req.body.pictureUrl,
		description: req.body.description,
		date: dateGenerator(),
		id: idGeneretor.generateId(),
	};

	logger.setLogData(product);
	logger.info("request recieved at /product");

	if (product.name == null || product.name == "") {
		logger.error("name field is empty");
		error["name"] = "name field is empty";
	}
	if (product.price == null || product.price == "") {
		logger.error("price field is empty");
		error["price"] = "price field is empty";
	}
	var priceValidationRegEx = /^([0-9])+$/;
	var isPriceValid = priceValidationRegEx.test(product.price);
	if (!isPriceValid) {
		logger.error("price field is not a number");
		error["price"] = "price field is not a number";
	}
	if (product.quantity == null || product.quantity == "") {
		logger.error("quantity field is empty");
		error["quantity"] = "quantity field is empty";
	}
	var quantityValidationRegEx = /^([0-9])+$/;
	var isQuantityValid = quantityValidationRegEx.test(product.quantity);
	if (!isQuantityValid) {
		logger.error("Quantity field is not a number");
		error["quantity"] = "Quantity field is not a number";
	}
	if (product.pictureUrl == null || product.pictureUrl == "") {
		logger.error("pictureUrl field is empty");
		error["pictureUrl"] = "pictureUrl field is empty";
	}
	if (product.description == null || product.description == "") {
		logger.error("description field is empty");
		error["description"] = "description field is empty";
	}
	if (Object.keys(error).length != 0) {
		logger.error("added product seccessfully"),
			{
				success: false,
			};
		res.send("Error");
	} else {
		productsModel.createProduct(product);
		logger.info("added product seccessfully"),
			{
				success: true,
			};
		res.status(201).json({
			message: "added product seccessfully",
			createdProduct: product,
		});
	}
};

const getProducts = (req, res) => {
	const allProducts = productsModel.getProducts();
	logger.setLogData(allProducts);
	logger.info("Handling GET requests to /product");
	res.status(200).json({
		message: "Handling GET requests to /product",
		allProducts,
	});
};

const getProductId = (req, res) => {
	const id = Number(req.params.productId);
    const product = productsModel.getProductId(id);
 
        logger.setLogData(product);
	    logger.info("Handling GET requests to /product/" + id);
	    res.status(200).json({
		    message: "Handling GET requests to /product/" + id,
		    product,
	    });
};

const updateProduct = (req, res) => {
	const id = Number(req.params.productId);
	const product = {
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.quantity,
		pictureUrl: req.body.pictureUrl,
		description: req.body.description,
		date: req.body.date,
		id,
	};
	productsModel.updateProduct(product);
	logger.setLogData(product);
	logger.info("Updated product!");
	res.status(200).json({
		message: "Updated product!",
		product,
	});
};

const deleteProduct = (req, res) => {
	const id = Number(req.params.productId);
	const deletedProduct = productsModel.deleteProduct(id);
	logger.setLogData(deletedProduct);
	logger.info("Deleted product!");
	res.status(200).json({
		message: "Deleted product!",
		deletedProduct,
	});
};

module.exports = {
	deleteProduct,
	createProduct,
	updateProduct,
	getProductId,
	getProducts,
};
