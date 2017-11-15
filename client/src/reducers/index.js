import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import contacts from './contacts'
import addresses from './addresses'
import phones from './phones'
import emails from './emails'

const rootReducer = combineReducers({
  emails,
  phones,
  addresses,
  contacts,
  user,
  flash,
})

export default rootReducer
