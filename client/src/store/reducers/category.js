const defaultState = {
    type: '',
    title: '',
}

const category = (state = defaultState, action) => {
  switch(action.type){
    case 'CONSOLE':
      return {
        ...state,
        type: action.type,
        title: "קונסולות",
      }
    default:
      return state
  }
};

export default category;

