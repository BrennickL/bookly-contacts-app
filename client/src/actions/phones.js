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
