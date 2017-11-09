import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import DashboardContainer from '../splitter-dashboard/DashboardContainer'
import './SplitterContainers.css'

class LeftContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    return (
      <div id="leftContainer" className="containers">
        <MuiThemeProvider>
          <DashboardContainer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LeftContainer