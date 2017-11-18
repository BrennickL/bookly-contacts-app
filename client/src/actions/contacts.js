import axios from 'axios'
import { setFlash } from './flash'

export const indexContacts = ( userId, letter = 'A', page = 1, per_page = 10 ) => {
  const query = `?page=${page}&per_page=${per_page}&letter=${letter}`
  return (dispatch) => {
    axios.get(`/api/user/${userId}/contacts${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTACTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contacts not Indexed!','error')
      )
    })
  }
}

export const resetContacts = () => {
  return {
    type: 'RESET_CONTACTS',
  }
}

export const deleteContact = ( contactId ) => {
  return (dispatch) => {
    axios.delete(`/api/contacts/${contactId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_CONTACT',
        data: contactId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Content not Deleted!','error')
      )
    })
  }
}

export const showContact = ( contactId, callback = null ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_CONTACT',
        data: resp.data,
        headers: resp.headers,
      })
      if( callback )
        callback()
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact not Loaded!','error')
      )
    })
  }
}

export const updateContact = ( contact ) => {
  return (dispatch) => {
    axios.patch(`/api/contacts/${contact.id}`, { contact })
    .then( resp => {
      dispatch({
        type: 'UPDATE_CONTACT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact not Updated!','error')
      )
    })
  }
}

export const createContact = ( userId, contact ) => {
  return (dispatch) => {
    axios.post(`/api/user/${userId}/contacts`, { contact } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact not Updated!','error')
      )
    })
  }
}

export const createContactAddress = ( address ) => {
  return (dispatch) => {
    axios.post(`/api/contacts/${address.contact_id}/addresses`, { address } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT_ADDRESS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Address not Created!','error')
      )
    })
  }
}

export const createContactPhone = ( phone ) => {
  return (dispatch) => {
    axios.post(`/api/contacts/${phone.contact_id}/phones`, { phone } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT_PHONE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Phone not Created!','error')
      )
    })
  }
}

export const createContactEmail = ( email ) => {
  return (dispatch) => {
    axios.post(`/api/contacts/${email.contact_id}/emails`, { email } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT_EMAIL',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Email not Created!','error')
      )
    })
  }
}

export const deleteContactEmail = ( emailId ) => {
  return {
    type: 'DELETE_CONTACT_EMAIL',
    data: emailId,
  }
}

export const deleteContactPhone = ( phoneId ) => {
  return {
    type: 'DELETE_CONTACT_PHONE',
    data: phoneId,
  }
}

export const deleteContactAddress = ( addressId ) => {
  return {
    type: 'DELETE_CONTACT_ADDRESS',
    data: addressId,
  }
}

export const resetNewContact = () => {
  return {
    type: 'RESET_NEW_CONTACT',
  }
}


export const indexContactAddresses = ( contactId, callback = null ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/addresses`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTACT_ADDRESSES',
        data: resp.data,
        headers: resp.headers,
      })
      if( callback )
        callback()
    })
    .catch( resp => {
      dispatch(
        setFlash('Addresses not Indexed!','error')
      )
    })
  }
}

export const indexContactPhones = ( contactId, callback = null ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/phones`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTACT_PHONES',
        data: resp.data,
        headers: resp.headers,
      })
      if( callback ) {
        callback()
      }
    })
    .catch( resp => {
      dispatch(
        setFlash('Phones not Indexed!','error')
      )
    })
  }
}

export const indexContactEmails = ( contactId, callback = null ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/emails`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTACT_EMAILS',
        data: resp.data,
        headers: resp.headers,
      })
      if( callback )
        callback()
    })
    .catch( resp => {
      dispatch(
        setFlash('Emails not Indexed!','error')
      )
    })
  }
}
