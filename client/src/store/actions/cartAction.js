const cartAction = (product, quantity) => {
	return{
		type: "ADD_TO_CART",
		payload: [{
			product,
			quantity
		}]
	};
};

const clearCartAction = () => {
	return{
		type: "CLEAR_CART",
	};
};

export default cartAction;

export { clearCartAction };