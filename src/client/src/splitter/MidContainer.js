import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import EventMemberPanel from '../event/EventMemberPanel'
import "./style.css"

const muiTheme = getMuiTheme({
    fontFamily: 'Alegreya Sans SC'
  });

  const Panel = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
      <EventMemberPanel />
    </MuiThemeProvider>
  );

class MidContainer extends React.Component {

  render(){
    return (
      <div id="midContainer" className="containers">
        <Panel />
      </div>
    );
  }
}

export default MidContainer