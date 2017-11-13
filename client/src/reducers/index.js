import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import contacts from './contacts'
import addresses from './addresses'
import phones from './phones'

const rootReducer = combineReducers({
  phones,
  addresses,
  contacts,
  user,
  flash,
})

export default rootReducer
