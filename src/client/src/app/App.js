import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import FinanceManagerPanel from '../finance-manager/FinanceManagerPanel'
import SplitterPanel from '../splitter-containers/SplitterPanel'
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props);
  }

	render(){
		return (
      <FinanceManagerPanel />
    );
	}
}

export default App
