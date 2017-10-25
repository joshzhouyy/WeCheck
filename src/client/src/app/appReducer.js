import {SELECT_ACTIVE_PANEL} from '../constants/ActionTypes'

// Selectors(getters)
export const getActivePanel = (state) => {
  // console.log(JSON.stringify(state))
  return state.panels.activePanel;
}

const initialState = {
    activePanel: "MESSAGE_BOX"
};

// Reducers(setters)
const panels = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_ACTIVE_PANEL:
      console.log("selected " + action.activePanel)
      return {
        ...state,
        ativePanel: action.activePanel
      }
    default:
      return state;
  }
}

export default panels