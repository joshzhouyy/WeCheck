import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EventListContainer from "../event/EventListContainer"
import CreateNewEventbtnContainer from '../event/CreateNewEventbtnContainer'
import "./SplitterContainers.css"

class RightContainer extends React.Component {

  render(){
    return (
      <div id="rightContainer" className="containers">
        <MuiThemeProvider>
          <EventListContainer />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <CreateNewEventbtnContainer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default RightContainer