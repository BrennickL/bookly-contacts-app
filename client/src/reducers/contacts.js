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
    case 'DELETE_CONTACT':
      const contacts = state.data.filter( c => c.id !== action.data )
      return {
        ...state,
        data: contacts,
      }
    default:
      return state
  }
}

export default contacts
