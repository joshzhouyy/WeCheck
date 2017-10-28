import React from 'react';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

import "./DailyExpenseRecordPanel.css"

const styles = {
  ExpenseInfoStyle: {
    height: 40,
    width: 700,
    display: 'inline-block',
    margin:20
  },
};

const DailyExpenseInfo = () => (
  <div id="DailyExpenseInfoDiv">
    
    <h1 id="title"> Daily Expense Record </h1>

    <p1 id="date">
      09/14
    </p1>
    
    <Paper id="paper1" style={styles.ExpenseInfoStyle} zDepth={5} >
      <p id="info"> 
        Amount: $17.56, Category: Hotel
        <div id="Btns">
          <RaisedButton 
            label="Edit" 
            backgroundColor={teal100}
            className="editBtn"
            style={{ fontSize: '1.5rem' }}
          /> 
          <RaisedButton 
            label="Delete" 
            backgroundColor={orange500}
            className="deleteBtn"
            style={{ fontSize: '1.5rem' }}
          />
        </div> 

      </p>
    </Paper>
    <br />

    <p1 id="amount">
      $100
    </p1>
    
    <Paper id="paper2" style={styles.ExpenseInfoStyle} zDepth={5} >
      <p id="info"> 
        Amount: $23.76, Category: Restaurant
        <div id="Btns">
          <RaisedButton 
            label="Edit" 
            backgroundColor={teal100}
            className="editBtn"
            style={{ fontSize: '1.5rem' }}
          /> 
          <RaisedButton 
            label="Delete" 
            backgroundColor={orange500}
            className="deleteBtn"
            style={{ fontSize: '1.5rem' }}
          />
        </div>  

      </p>
    </Paper>

    
    
  </div>
);


const DailyExpenseRecordPanel = () => (
  <Paper id="DailyExpenseRecordContainer">
    <Grid id="DailyExpenseRecordGrid">
    <Row id="DailyExpenseRecordRow">
      {DailyExpenseInfo()}
    </Row>
    

  </Grid>
  </Paper>
);

export default DailyExpenseRecordPanel;