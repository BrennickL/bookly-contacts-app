import axios from 'axios'
import { setFlash } from './flash'

export const indexAddresses = ( contactId ) => {
  return (dispatch) => {
    axios.get(`/api/contacts/${contactId}/addresses`)
    .then( resp => {
      dispatch({
        type: 'INDEX_ADDRESSES',
        data: resp.data,
        headers: resp.headers,
      })
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
