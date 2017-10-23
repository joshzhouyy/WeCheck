import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import EventMemberPanel from '../event/EventMemberPanel'
import BalancePanel from '../balance-panel/BalancePanel'
import MessageBox from '../message-box/MessageBox'
import "./SplitterContainers.css"

const muiTheme = getMuiTheme({
    fontFamily: 'Alegreya Sans SC'
  });

  const Panel = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
      <EventMemberPanel isCreator={props.isCreator}/>
    </MuiThemeProvider>
  );

class MidContainer extends React.Component {

  render(){
    let props = {
      isCreator: false
    }
    return (
      <div id="midContainer" className="containers">
        <Panel {...props}/>
      </div>
    );
  }
}

export default MidContainer