// Action Handlers
//http://redux.js.org/docs/basics/ExampleTodoList.html

import { combineReducers } from 'redux'
import panels from './appReducer'
import authReducer from '../reducers/auth_reducer'

const rootReducer = combineReducers({
  panels,
  authReducer
})

export default rootReducer
