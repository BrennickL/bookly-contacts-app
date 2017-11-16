const defaults = {
  data: []
}

const addresses = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'RESET_ADDRESSES':
      return {
        ...defaults
      }
    case 'INDEX_ADDRESSES':
      return {
        ...state,
        data: action.data,
      }
    case 'DELETE_ADDRESS':
      const addresses = state.data.filter( a => a.id !== action.data )
      return {
        ...state,
        data: addresses
      }
    default:
      return state
  }
}

export default addresses
