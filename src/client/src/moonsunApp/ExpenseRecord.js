import React from 'react';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'

import ExpenseCreate from './ExpenseCreate';
import Record from './Record'

import "./ExpenseRecord.css"

const ExpenseRecord = () => (
  <Paper id="ExpenseRecordContainer">
    <Grid id="ExpenseRecordGrid">
    <Row id="ExpenseCreateRow">
      <ExpenseCreate />
    </Row>
    <Row id="ExpenseRecordRow">
      <Record />
    </Row>    

  </Grid>
  </Paper>
);

export default ExpenseRecord;
