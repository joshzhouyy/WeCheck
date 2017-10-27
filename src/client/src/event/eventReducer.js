import {REMOVE_EVENT} from '../constants/ActionTypes'

// Selectors(getters)
// export const getSelectedEventId = (state) => {
//   return state.event.selectedEventId;
// }

const initialState = {
    selectedDeleteEventId: ""
};

// Reducers(setters)
const event = (state = initialState, action) => {
  switch(action.type) {
    case REMOVE_EVENT:
      console.log(action.eventId + " was selected")
      return {
        ...state,
        selectedDeleteEventId: action.eventId,
      }
    default:
      return state;
  }
}

// export default event