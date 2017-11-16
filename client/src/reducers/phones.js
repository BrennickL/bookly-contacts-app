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
    case 'DELETE_PHONE':
      const phones = state.data.filter( p => p.id !== action.data )
      return {
        ...state,
        data: phones,
      }
    default:
      return state
  }
}

export default phones
