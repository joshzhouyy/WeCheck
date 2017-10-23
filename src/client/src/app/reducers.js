// Action Handlers
//http://redux.js.org/docs/basics/ExampleTodoList.html

import { combineReducers } from 'redux'
import panels from './appReducer'

const rootReducer = combineReducers({
  panels
})

export default rootReducer
