import axios from 'axios'
import { setFlash } from './flash'

export const indexAddresses = ( contactId, callback = null ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/addresses`)
    .then( resp => {
      dispatch({
        type: 'INDEX_ADDRESSES',
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

export const resetAddresses = () => {
  return {
    type: 'RESET_ADDRESSES',
  }
}

export const deleteAddress = ( addressId ) => {
  return (dispatch) => {
    axios.delete(`/api/addresses/${addressId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_ADDRESS',
        data: addressId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Address not Deleted!','error')
      )
    })
  }
}

export const updateAddress = ( address ) => {
  return (dispatch) => {
    axios.patch(`/api/addresses/${address.id}`, { address } )
    .then( resp => {
      dispatch({
        type: 'UPDATE_ADDRESS',
        data: resp.data,
        headers: resp.headers
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Address not Updated!','error')
      )
    })
  }
}
