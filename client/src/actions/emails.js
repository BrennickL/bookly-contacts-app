import axios from 'axios'
import { setFlash } from './flash'

export const indexEmails = ( contactId ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/emails`)
    .then( resp => {
      dispatch({
        type: 'INDEX_EMAILS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Emails not Indexed!','error')
      )
    })
  }
}

export const resetEmails = () => {
  return {
    type: 'RESET_EMAILS',
  }
}

export const updateEmail = ( email ) => {
  return (dispatch) => {
    axios.patch(`/api/emails/${email.id}`, { email } )
    .then( resp => {
      dispatch({
        type: 'UPDATE_EMAIL',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Email not Updated!','error')
      )
    })
  }
}

export const deleteEmail = ( emailId ) => {
  return (dispatch) => {
    axios.delete(`/api/emails/${emailId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_EMAIL',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Email not Deleted!','error')
      )
    })
  }
}
