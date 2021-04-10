const defaultState = {
	cartItems: [],
};

const cartReducer = (state = defaultState, action) => {
	let itemFound;
	switch (action.type) {
	case 'ADD_TO_CART':
		if (action.payload) {
			itemFound = state.cartItems.find((item) => (
				item.product.name === action.payload[0].product.name));
			if (itemFound) {
				const newQuantity = itemFound.quantity + action.payload[0].quantity;
				const newProduct = action.payload[0].product;
				const newCartItem = { product: newProduct, quantity: newQuantity };
				return {
					...state,
					cartItems: state.cartItems.filter((item) => (
						item.product.name !== itemFound.product.name)).concat(newCartItem),
				};
			}
			return {
				...state,
				cartItems: state.cartItems.concat(action.payload),
			};
		}
		return state;
	case 'CLEAR_CART':
		return {
			...state,
			cartItems: [],
		};

	case 'CLEAR_PRODUCT':
		return {
			...state,
			cartItems: state.cartItems.filter((item) => item.product.name !== action.payload.name),
		};
	default:
		return state;
	}
};

export default cartReducer;
