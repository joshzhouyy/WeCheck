import {SELECT_ACTIVE_PANEL} from '../constants/ActionTypes'

export const getAtivePanel = (state) => {
  return state.ativePanel;
}

const panels = (state="MESSAGE_BOX", action) => {
  switch(action.type) {
    case SELECT_ACTIVE_PANEL:
      return action.activePanel;
    default:
      return state;
  }
}

export default panels;