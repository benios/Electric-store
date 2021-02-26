const defaultState = {
  user: {},
}

const currentUserReducer = (state = defaultState, action) => {
  switch(action.type){
    case 'CURRENT_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
    return state
  }
}

export default currentUserReducer;