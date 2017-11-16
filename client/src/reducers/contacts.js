const defaults = {
  data: [],
  pagination: {},
  contact: {
    data: {},
    addresses: [],
    phones: [],
    emails: [],
  }
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
    case 'SHOW_CONTACT':
      return {
        ...state,
        contact: {
          ...state.contact,
          data: action.data,
        }
      }
    case 'CREATE_CONTACT':
      return {
        ...state,
        contact: {
          ...state.contact,
          data: action.data,
        },
      }
    case 'UPDATE_CONTACT':
      const index =  state.data.findIndex( c => c.id === action.data.id )
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index + 1),
        ],
      }
    case 'CREATE_CONTACT_ADDRESS':
      return {
        ...state,
        contact: {
          ...state.contact,
          addresses: [
            action.data,
            ...state.contact.addresses,
          ],
        },
      }
    case 'DELETE_CONTACT_ADDRESS':
      const addresses = state.contact.addresses.filter( a => a.id !== action.data )
      return {
        ...state,
        contact: {
          ...state.contact,
          addresses,
        },
      }
    case 'CREATE_CONTACT_PHONE':
      return {
        ...state,
        contact: {
          ...state.contact,
          phones: [
            action.data,
            ...state.contact.phones,
          ],
        },
      }
    case 'DELETE_CONTACT_PHONE':
      const phones = state.contact.phones.filter( p => p.id !== action.data )
      return {
        ...state,
        contact: {
          ...state.contact,
          phones,
        },
      }
      case 'CREATE_CONTACT_EMAIL':
        return {
          ...state,
          contact: {
            ...state.contact,
            emails: [
              action.data,
              ...state.contact.emails,
            ],
          },
        }
      case 'DELETE_CONTACT_EMAIL':
        const emails = state.contact.emails.filter( e => e.id !== action.data )
        return {
          ...state,
          contact: {
            ...state.contact,
            emails,
          }
        }
      case 'RESET_NEW_CONTACT':
        return {
          ...state,
          contact: defaults.contact,
        }
      case 'INDEX_CONTACT_ADDRESSES':
        return {
          ...state,
          contact: {
            ...state.contact,
            addresses: action.data,
          }
        }
      case 'INDEX_CONTACT_PHONES':
        return {
          ...state,
          contact: {
            ...state.contact,
            phones: action.data,
          }
        }
      case 'INDEX_CONTACT_EMAILS':
        return {
          ...state,
          contact: {
            ...state.contact,
            emails: action.data,
          }
        }
    default:
      return state
  }
}

export default contacts
