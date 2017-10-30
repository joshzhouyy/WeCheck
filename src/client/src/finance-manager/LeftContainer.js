import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ExpenseRecord from './ExpenseRecord'
import './FMContainers.css'

class LeftContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    return (
      <div id="leftContainer" className="containers">
        <MuiThemeProvider>
          <ExpenseRecord/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LeftContainer