import {SELECT_ACTIVE_PANEL, SELECT_EVENT} from '../constants/ActionTypes'
import {EVENT_PANEL} from '../constants/Names';


// Selectors(getters)
export const getActivePanel = (state) => {
  // console.log(JSON.stringify(state))
  return state.panels.activePanel;
}

export const getSelectedEventId = (state) => {
  return state.panels.selectedEventId;
}

const initialState = {
    selectedPanel: "MESSAGE_BOX",
    activePanel: "MESSAGE_BOX",
    selectedEventId: ""
};

// Reducers(setters)
const panels = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_ACTIVE_PANEL:
      console.log("selected " + action.selectedPanel)
      return {
        ...state,
        selectedPanel: action.selectedPanel,
        activePanel: action.selectedPanel
      }
    case SELECT_EVENT:
      console.log(action.eventId + " was selected")
      return {
        ...state,
        selectedEventId: action.eventId,
        activePanel: EVENT_PANEL
      }
    default:
      return state;
  }
}

export default panels