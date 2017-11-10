import axios from 'axios'
import { setFlash } from './flash'

export const indexContacts = ( page = 1, per_page = 10 ) => {
  const pagination = `?page=${page}&per_page=${per_page}`
  return (dispatch) => {
    axios.get(`/api/contacts${pagination}`)
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
