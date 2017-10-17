import React from 'react'
import PropTypes from 'prop-types'

import SubHeader from './Subheader'


class App extends React.Component {

	render(){
		const props = {
			headerName: "Dashboard"
		}

		return (
			<div><SubHeader {...props} /></div>
		);
	}
}

export default App
