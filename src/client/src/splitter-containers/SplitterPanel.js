import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import LeftContainer from './LeftContainer'
import MidContainer from './MidContainer'
import RightContainer from './RightContainer'

const SplitterPanel = () => {
  return (
    <Grid id="SplitterCotainer">
      <Row id="mainActivityRow">
        <Col md={2} className="mainActivityCols"><LeftContainer /></Col>
        <Col md={7} className="mainActivityCols"><MidContainer /></Col>
        <Col md={3} className="mainActivityCols"><RightContainer /></Col>
      </Row>
    </Grid>
  );
}

export default SplitterPanel

