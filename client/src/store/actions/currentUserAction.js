const currentUserAction = (user) => {
	return {
		type: "CURRENT_USER",
		payload:user
	};
};

export default currentUserAction;
