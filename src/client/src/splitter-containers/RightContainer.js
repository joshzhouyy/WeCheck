import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import EventList from "../event/EventList"
import "./SplitterContainers.css"

class RightContainer extends React.Component {

  render(){
    return (
      <div id="rightContainer" className="containers">
        <MuiThemeProvider>
          <EventList />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default RightContainer