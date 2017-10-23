import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dashboard from '../splitter-dashboard/Dashboard'
import './SplitterContainers.css'


class LeftContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    let props = {
      handleTouchTap: this.props.handleTouchTap
    }

    return (
      <div id="leftContainer" className="containers">
        <MuiThemeProvider>
          <Dashboard {...props}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

LeftContainer.propTypes = {
  handleTouchTap: PropTypes.func.isRequired
}

export default LeftContainer