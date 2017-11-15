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
    default:
      return state
  }
}

export default emails
