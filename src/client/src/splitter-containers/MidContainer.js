import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EventMemberPanel from '../event/EventMemberPanel';
import BalancePanel from '../balance-panel/BalancePanel';
import MessageBox from '../message-box/MessageBox';
import {MESSAGE_BOX, BALANCE} from '../constants/Names';
import "./SplitterContainers.css";

import { connect } from 'react-redux';
import {selectActivePanel} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';

const muiTheme = getMuiTheme({
    fontFamily: 'Alegreya Sans SC'
});

const ActivePanel = (props)=> {
  const panelName = props.panelName
  switch(panelName) {
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
    default:
      return null
  }
}


class MidContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    // console.log(this.props);
    const panelName = this.props.activePanel;

    return (
      <div id="midContainer" className="containers">
        <ActivePanel panelName={panelName} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  activePanel: appSelectors.getActivePanel(state)
});

export default connect(mapStateToProps)(MidContainer)