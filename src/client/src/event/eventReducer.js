import {
  REMOVE_EVENT, 
  UPDATED_TOTAL, 
  DELETED_MEMBER
} from '../constants/ActionTypes'

// Selectors(getters)
export const getRemovedEventId = (state) => {
  return state.event.selectedDeleteEventId;
}

export const getUpdatedTotal = (state) => {
  return state.event.updatedTotal;
}

export const getDeletedMember = (state) => {
  return state.event.deletedMember;
}


const initialState = {
    selectedDeleteEventId: "",
    updatedTotal: null,
    deletedMember: false
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
    case UPDATED_TOTAL:
      // console.log("user updated total amount for " + action.event.eventName + " to " + action.event.eventTotal);
      return {
        ...state,
        updatedTotal: action.event.eventTotal
      }
    case DELETED_MEMBER:
      // console.log(state)
      return {
        ...state,
        deletedMember: !state.deletedMember
      }
    default:
      return state;
  }
}

export default event