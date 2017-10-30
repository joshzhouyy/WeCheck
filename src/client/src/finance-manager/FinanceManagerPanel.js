import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'

const FinanceManagerPanel = () => {
  return (
  <Grid id="FMGrid">
    <Row id="mainActivityRow">
      <Col md={5} className="mainActivityCols"><LeftContainer /></Col>        
      <Col md={7} className="mainActivityCols"><RightContainer /></Col>
    </Row>
  </Grid>
);}

export default FinanceManagerPanel;