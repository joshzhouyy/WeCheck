import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ExpenseAnalysis from "../expense-analysis/ExpenseAnalysis"
import "./FMContainers.css"

class RightContainer extends React.Component {

  render(){
    return (
      <div id="rightContainer" className="containers">
        <MuiThemeProvider>
          <ExpenseAnalysis />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default RightContainer