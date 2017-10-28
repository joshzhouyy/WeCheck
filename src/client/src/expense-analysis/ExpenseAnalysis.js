import React from 'react';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'

import AnalysisTotal from './AnalysisTotal'
import AnalysisAvg from './AnalysisAvg'
import AnalysisTop from './AnalysisTop'
import Diagram from './Diagram'

import "./ExpenseAnalysis.css"


const ExpenseAnalysis = () => (
  <Paper id="ExpenseAnalysisContainer">
    <Grid id="ExpenseAnalysisGrid">
    <Row id="ExpenseTotalRow">
      <AnalysisTotal />
    </Row>
    <Row id="ExpenseAvgRow">
      <AnalysisAvg />
    </Row>
    <Row id="ExpenseTopRow">
      <AnalysisTop />
    </Row>
    <Row id="DiagramRow">
      <Diagram />
    </Row>    

  </Grid>
  </Paper>
);

export default ExpenseAnalysis;
