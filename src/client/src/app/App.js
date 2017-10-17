import React from 'react'
import PropTypes from 'prop-types'

import SubHeader from './Subheader'
import Subheader from './Subheader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import EventMemberPanel from '../event/EventMemberPanel'


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
		const props = {
			headerName: "Dashboard"
		}

		return (
			<Panel />
		);
	}
}

export default App
