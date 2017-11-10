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
