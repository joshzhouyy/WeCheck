import {SELECT_ACTIVE_PANEL} from '../constants/ActionTypes'

// Selectors(getters)
//why this can get the state of activePanel, what is panels
export const getActivePanel = (state) => {
  // console.log("called getActivePanel")
  return state.panels.activePanel;
}


//which one is selectedPanel, which is activePanel，why are they initialized as MESSAGE_BOX.
const initialState = {
    selectedPanel: "MESSAGE_BOX",
    activePanel: "MESSAGE_BOX"
};





// Reducers(setters)
const panels = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_ACTIVE_PANEL:
      // console.log("selected " + action.selectedPanel)
      return {
        // why selectedPanel: action.selectedPanel, and activePanel: action.selectedPanel
        ...state,
        selectedPanel: action.selectedPanel,
        activePanel: action.selectedPanel
      }
    default:
      return state;
  }
}

export default panels