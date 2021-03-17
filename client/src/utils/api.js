import axios from 'axios';
import get from 'lodash/get';

const API = {
	// USER
	signup: async (userName, password, firstName, lastName, address, age) => {
		let response;
		try {
			response = await axios.post('/user', {
				userName,
				password,
				firstName,
				lastName,
				address,
				age,
			});
			return get(response, 'data.foundUser');
		} catch (error) {
			return error;
		}
	},

	login: async (userName, password) => {
		let response;
		try {
			response = await axios.post('/user/login', { userName, password });
		} catch (error) {
			return error;
		}
		return get(response, 'data.foundUser');
	},

	logout: async () => {
		let response;
		try {
			response = await axios.post('/user/logout');
		} catch (error) {
			return error;
		}
		return response;
	},

	// Product
	createProduct: async (name, price, category, quantity, pictureUrl, description) => {
		let response;
		try {
			response = await axios.post('/product', {
				name, price, category, quantity, pictureUrl, description,
			});
		} catch (error) {
			return error;
		}
		console.log(response);
		return get(response, 'data.foundUser');
	},

	getProductByViews: async () => {
		let products;
		try {
			products = await axios.get('/product/products');
		} catch (error) {
			return error;
		}
		const hotProducts = get(products, 'data.foundProducts');
		return hotProducts;
	},

	getProductByCategory: async (category) => {
		let products;
		try {
			products = await axios.get(`/product/categories/${category}`);
		} catch (error) {
			return error;
		}
		return get(products, 'data.foundProducts');
	},

	getProductById: async (productId) => {
		let product;
		try {
			product = await axios.get(`/product/${productId}`);
		} catch (error) {
			return error;
		}
		return get(product, 'data.foundProduct');
	},

	quantityUpdate: async (quantityUpdate) => {
		let response;
		try {
			response = await axios.patch(`/product/productUpdate/${quantityUpdate.id}`, { quantity: quantityUpdate.quantity });
		} catch (error) {
			return error;
		}
		return response;
	},

	viewsUpdate: async (productId, views) => {
		const newViews = views + 1;
		let response;
		try {
			response = await axios.patch(`/product/productUpdate/${productId}`, { views: newViews });
		} catch (error) {
			return error;
		}
		return response;
	},

	// Order

	createOrder: async (userName, products) => {
		let response;
		try {
			response = await axios.post('/order', { userName, products });
		} catch (error) {
			return error;
		}
		return response;
	},

	getOrdersByUsername: async (userName) => {
		let orders;
		try {
			orders = await axios.get(`/order/usersOrders/${userName}`);
		} catch (error) {
			return error;
		}
		return get(orders, 'data.foundOrders');
	},
};

export default API;
