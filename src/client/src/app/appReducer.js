import {
  SELECT_ACTIVE_PANEL, 
  SELECT_EVENT,
  SELECT_ACTIVE_PAGE,
  SELECT_CREATE_NEW_EVENT
        } from '../constants/ActionTypes'
import {EVENT_PANEL} from '../constants/Names';


// Selectors(getters)
export const getActivePanel = (state) => {
  // console.log(JSON.stringify(state))
  return state.panels.activePanel;
}

export const getSelectedEventId = (state) => {
  return state.panels.selectedEventId;
}

export const getUserIdentity = (state) => {
  return state.panels.isOwner;
}

export const getActivePage = (state) => {
  return state.panels.selectedPage;
}

export const getEventListDefaultValue = (state) => {
  return state.panels.eventListDefaultValue;
}

export const getSelectedEventName = (state) => {
  return state.panels.selectedEventName;
}

const initialState = {
    selectedPanel: "MESSAGE_BOX",
    activePanel: "MESSAGE_BOX",
    selectedEventId: "",
    isOwner: false,
    selectedPage: "SPLITTER",
    eventListDefaultValue: -1,
    selectedEventName: "",
};


// Reducers(setters)
const panels = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_ACTIVE_PANEL:
      // console.log("selected " + action.selectedPanel)
      return {
        ...state,
        selectedPanel: action.selectedPanel,
        activePanel: action.selectedPanel,
        eventListDefaultValue: -1
      }
    case SELECT_EVENT:
      // console.log(action.event.eventId + " was selected")
      return {
        ...state,
        selectedEventId: action.event.eventId,
        isOwner: action.event.isOwner,
        activePanel: EVENT_PANEL,
        eventListDefaultValue: action.event.value,
        selectedEventName: action.event.eventName
      }
    case SELECT_ACTIVE_PAGE:
      return {
        ...state,
        selectedPage: action.selectedPage
      }
    case SELECT_CREATE_NEW_EVENT:
      return {
        ...state,
        selectedPanel: "CREATE_BOX",
        activePanel: "CREATE_BOX"
      }
    default:
      return state;
  }
}

export default panels