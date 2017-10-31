import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EventPanelContainer from '../event/EventPanelContainer';
import BalancePanel from '../balance-panel/BalancePanel';
import MessageBox from '../message-box/MessageBox';
import {MESSAGE_BOX, BALANCE, EVENT_PANEL, CREATE_BOX} from '../constants/Names';
import CreateEventPanelContainer from '../event/CreateEventPanelContainer';


const muiTheme = getMuiTheme({
    fontFamily: 'Alegreya Sans SC'
});

const ActivePanel = (props)=> {
  const activePanel = props.activePanel
  switch(activePanel) {
    case MESSAGE_BOX:
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <MessageBox />
        </MuiThemeProvider>
      );
    case  BALANCE:
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <BalancePanel />
        </MuiThemeProvider>
      );
    case EVENT_PANEL:
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <EventPanelContainer />
        </MuiThemeProvider>
      );
    case  CREATE_BOX:
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <CreateEventPanelContainer />
        </MuiThemeProvider>
      );
    default:
      return null
  }
}

export default ActivePanel