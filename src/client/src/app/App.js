import React from 'react'
import PropTypes from 'prop-types'

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

		return (
			<Panel />
		);
	}
}

export default App
