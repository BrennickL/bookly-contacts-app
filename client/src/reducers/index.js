import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import contacts from './contacts'
import addresses from './addresses'

const rootReducer = combineReducers({
  addresses,
  contacts,
  user,
  flash,
})

export default rootReducer
