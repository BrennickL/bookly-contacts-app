import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import contacts from './contacts'

const rootReducer = combineReducers({
  contacts,
  user,
  flash,
})

export default rootReducer
