import React from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import EventMemberPanel from '../event/EventMemberPanel'
import TopBar from "../utilities/Topbar"
import Sidebar from "../utilities/Sidebar"


const muiTheme = getMuiTheme({
  fontFamily: 'Alegreya Sans SC'
  
  
});


const Panel = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <EventMemberPanel />
  </MuiThemeProvider>
);

class App extends React.Component {

	render(){

		return (
			<div>
			  <TopBar />
		    <Sidebar />
  		</div>
		);
	}
}

export default App
