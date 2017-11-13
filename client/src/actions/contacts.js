import axios from 'axios'
import { setFlash } from './flash'

export const indexContacts = ( letter = 'A', page = 1, per_page = 10 ) => {
  const query = `?page=${page}&per_page=${per_page}&letter=${letter}`
  return (dispatch) => {
    axios.get(`/api/contacts${query}`)
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
