const defaults = {
  data: [],
}

const emails = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'RESET_EMAILS':
      return { ...defaults }
    case 'INDEX_EMAILS':
      return {
        ...state,
        data: action.data,
      }
    case 'DELETE_EMAIL':
      const emails = state.data.filter( e => e.id !== action.data )
      return {
        ...state,
        data: emails,
      }
    default:
      return state
  }
}

export default emails
