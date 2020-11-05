const Reducer = (state, action) => {
  switch (action.type) {
  case 'SET_BOTTOM_NAV_VALUE':
    return {
      ...state,
      bottomNavValue: action.payload,
    }
  default:
    return state
  }
}

export default Reducer
