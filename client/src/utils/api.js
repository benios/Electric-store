import axios from 'axios';
import get from 'lodash/get';

const API = {
	// USER
	signup: async (userName, password, firstName, lastName) => {
		let response;
		try {
			response = await axios.post('/user', {
				userName,
				password,
				firstName,
				lastName,
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

	loginWithThirdPartyApp: async (userId, source) => {
		let response;
		try {
			response = await axios.post('/user/third-party-login', { userId, source });
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
		let product;
		try {
			product = await axios.post('/product', {
				name, price, category, quantity, pictureUrl, description,
			});
		} catch (error) {
			return error;
		}
		return get(product, 'data');
	},

	updateProduct: async (productId, updateProps) => {
		let product;
		try {
			product = await axios.patch(`/product/${productId}`, { ...updateProps });
		} catch (error) {
			return error;
		}
		return get(product, 'data');
	},

	deleteProduct: async (productId) => {
		let product;
		try {
			product = await axios.delete(`/product/${productId}`);
		} catch (error) {
			return error;
		}
		return get(product, 'data');
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

	getProductByCategory: async (category, page) => {
		let products;
		try {
			products = await axios.get(`/product/categories/${category}?page=${page}`);
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

	getUserOrders: async () => {
		let orders;
		try {
			orders = await axios.get('/order/userOrders');
		} catch (error) {
			return error;
		}
		return get(orders, 'data.foundOrders');
	},
};

export default API;
