const defaults = {
  data: [],
  pagination: {},
}

const contacts = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'INDEX_CONTACTS':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination,
      }
      case 'RESET_CONTACTS':
        return {
          ...defaults
        }
    default:
      return state
  }
}

export default contacts
