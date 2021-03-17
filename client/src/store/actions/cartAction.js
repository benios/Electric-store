const cartAction = (product, quantity) => ({
	type: 'ADD_TO_CART',
	payload: [{
		product,
		quantity,
	}],
});

const clearCartAction = () => ({
	type: 'CLEAR_CART',
});

const clearProduct = (name) => ({
	type: 'CLEAR_PRODUCT',
	payload: {
		name,
	},
});

export default cartAction;

export { clearCartAction, clearProduct };
