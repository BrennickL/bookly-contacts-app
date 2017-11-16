import axios from 'axios'
import { setFlash } from './flash'

export const indexPhones = ( contactId ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/phones`)
    .then( resp => {
      dispatch({
        type: 'INDEX_PHONES',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Phones not Indexed!','error')
      )
    })
  }
}

export const resetPhones = () => {
  return {
    type: 'RESET_PHONES',
  }
}

export const updatePhone = ( phone ) => {
  return (dispatch) => {
    axios.patch(`/api/phones/${phone.id}`, { phone } )
    .then( resp => {
      dispatch({
        type: 'UPDATE_PHONE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Phone not Updated!','error')
      )
    })
  }
}

export const deletePhone = ( phoneId ) => {
  return (dispatch) => {
    axios.delete(`/api/phones/${phoneId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_PHONE',
        data: phoneId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Phone not Deleted!','error')
      )
    })
  }
}
