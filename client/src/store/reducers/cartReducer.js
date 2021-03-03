const defaultState = {
	cartItems: [],
};

const cartReducer = (state = defaultState, action) => {
	let itemFound;
	if(action.payload){
		itemFound = state.cartItems.find((item) => item.product.name === action.payload[0].product.name);
		if(itemFound){
			action.payload[0].quantity = action.payload[0].quantity + itemFound.quantity;
		}
	}
	switch(action.type){
	case "ADD_TO_CART":
		if(itemFound){
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item.product.name !== action.payload[0].product.name).concat(action.payload)
			};
		} else {
			return {
				...state,
				cartItems: state.cartItems.concat(action.payload)
			};
		}
	case "CLEAR_CART":
		return {
			...state,
			cartItems: []
		};
	default:
		return state;
	}
};

export default cartReducer;


