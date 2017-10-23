import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dashboard from '../splitter-dashboard/Dashboard'
import './SplitterContainers.css'

class LeftContainer extends React.Component {

  render(){
    return (
      <div id="leftContainer" className="containers">
        <MuiThemeProvider>
          <Dashboard />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LeftContainer