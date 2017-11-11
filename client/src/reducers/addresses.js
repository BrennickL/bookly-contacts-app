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
    default:
      return state
  }
}

export default addresses
