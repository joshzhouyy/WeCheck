import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LeftContainer from '../splitter/LeftContainer'
import Dashboard from '../splitter-dashboard/Dashboard'
import EventMemberPanel from '../event/EventMemberPanel'

// const muiTheme = getMuiTheme({
//   fontFamily: 'Alegreya Sans SC'
  
  
// });


// const Panel = () => (
//   <MuiThemeProvider muiTheme={muiTheme}>
//     <Dashboard />
//   </MuiThemeProvider>
// );

class App extends React.Component {

	render(){
		return (
      <MuiThemeProvider>
			  <LeftContainer />
      </MuiThemeProvider>
		);
	}
}

export default App
