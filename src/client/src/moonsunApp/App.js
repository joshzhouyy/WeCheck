import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import Topbar from "../utilities/Topbar"
import Sidebar from "../utilities/Sidebar"
import LeftContainer from '../moonsunApp/LeftContainer'
//import MidContainer from '../splitter-containers/MidContainer'
import RightContainer from '../moonsunApp/RightContainer'
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props);
  }

	render(){

		return (
      <Grid id="outerContainer">
        <Row id="topRow">
          <Topbar />
        </Row>

        <Row id="btmRow">
          <Col md={1} id="sideBar">
            <Sidebar />
          </Col>
          <Col md={11} id="mainActivity">
            <Row id="mainActivityRow">
              <Col md={5} className="mainActivityCols"><LeftContainer /></Col>
              
              <Col md={7} className="mainActivityCols"><RightContainer /></Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
	}
}

export default App
