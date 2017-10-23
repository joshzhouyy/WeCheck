import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import Topbar from "../utilities/Topbar"
import Sidebar from "../utilities/Sidebar"
import LeftContainer from '../splitter-containers/LeftContainer'
import MidContainer from '../splitter-containers/MidContainer'
import RightContainer from '../splitter-containers/RightContainer'
import './App.css'

import { connect } from 'react-redux'
import {selectActivePanel} from './AppActions'
import * as appSelectors from './appReducer'

const handleTouchTap = (item) => {
  console.log(item + " was selected\n");
  // Save selected item into state
  return item
}

const mapStateToProps = (state, ownProps) => ({
  ativePanel: appSelectors.getAtivePanel(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleTouchTap: () => {
    dispatch(selectActivePanel(ownProps.activePanel));
  }
})

class App extends React.Component {

  constructor(props) {
    super(props);
  }

	render(){
    let leftContainerProps = {
      handleTouchTap: handleTouchTap
    };

    let midContainerProps = {
      activePanel: this.props.activePanel
    };

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
              <Col md={2} className="mainActivityCols"><LeftContainer {...leftContainerProps}/></Col>
              <Col md={7} className="mainActivityCols"><MidContainer {...midContainerProps}/></Col>
              <Col md={3} className="mainActivityCols"><RightContainer /></Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
	}
}

connect(mapStateToProps,mapDispatchToProps)(App)

export default App
