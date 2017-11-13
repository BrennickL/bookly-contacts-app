const defaults = {
  data: [],
}

const phones = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'RESET_PHONES':
      return {
        ...defaults
      }
    case 'INDEX_PHONES':
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}

export default phones
