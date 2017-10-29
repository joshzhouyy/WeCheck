import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import Topbar from "../utilities/Topbar"
import SidebarContainer from "../utilities/SidebarContainer"
import FinanceManagerPanel from '../finance-manager/FinanceManagerPanel'
import SplitterPanel from '../splitter-containers/SplitterPanel'
import {SPLITTER, FINANCE_MANAGER} from '../constants/Names'
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props);
  }

	render(){
    const activePage = this.props.activePage;
    if (activePage === SPLITTER) {
      return (
        <Grid id="outerContainer">
          <Row id="topRow">
            <Topbar />
          </Row>
          <Row id="btmRow">
            <Col md={1} id="sideBar">
              <SidebarContainer />
            </Col>
            <Col md={11} id="mainActivity">
              <SplitterPanel />
            </Col>
          </Row>
        </Grid>
      );
    }
    else if (activePage === FINANCE_MANAGER) {
      return (
        <Grid id="outerContainer">
          <Row id="topRow">
            <Topbar />
          </Row>
          <Row id="btmRow">
            <Col md={1} id="sideBar">
              <SidebarContainer />
            </Col>
            <Col md={11} id="mainActivity">
              <FinanceManagerPanel />
            </Col>
          </Row>
        </Grid>
      );
    }
    else {
      return (
        <Grid id="emptyContainer"></Grid>
      );
    }
	}
}

export default App
