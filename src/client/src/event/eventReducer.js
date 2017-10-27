import {REMOVE_EVENT} from '../constants/ActionTypes'

// Selectors(getters)
export const getRemovedEventId = (state) => {
  return state.event.selectedDeleteEventId;
}

const initialState = {
    selectedDeleteEventId: ""
};

// Reducers(setters)
const event = (state = initialState, action) => {
  switch(action.type) {
    case REMOVE_EVENT:
      console.log(action.eventId + " was selected to be removed")
      return {
        ...state,
        selectedDeleteEventId: action.eventId,
      }
    default:
      return state;
  }
}

export default event