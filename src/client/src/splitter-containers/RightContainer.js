import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EventListContainer from "../event/EventListContainer"
import "./SplitterContainers.css"

class RightContainer extends React.Component {

  render(){
    return (
      <div id="rightContainer" className="containers">
        <MuiThemeProvider>
          <EventListContainer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default RightContainer