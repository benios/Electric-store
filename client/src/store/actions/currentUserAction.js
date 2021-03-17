const currentUserAction = (user) => ({
	type: 'CURRENT_USER',
	payload: user,
});

const clearCurrentUserAction = () => ({
	type: 'CLEAR_USER',
});

export default currentUserAction;

export { clearCurrentUserAction };
