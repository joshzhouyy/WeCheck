import React from 'react';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

import "./ExpensePanel.css"

var state = {value: 1};

const handleChange = (event, index, value) => this.setState({value});

const styles = {
  dropdown: {
    height:66
  },
  floatingLabelStyle: {
    color: indigo900,
  },
  underlineStyle: {
    bottom:9,
    borderColor: black,
  },
};

const expenseOptions = () => (
  <div id="expenseOptionsDiv">
    
    <h1 id="title"> Add an Expense </h1>

    Category:
    <DropDownMenu id= "categoryDropdown" value={state.value} onChange={handleChange} style={styles.dropdown} >
      <MenuItem value={1} primaryText="Restaurant" />
      <MenuItem value={2} primaryText="Hotel" />
      <MenuItem value={3} primaryText="Flight" />
          
    </DropDownMenu>
    <br />
    <br />

    <TextField  
      hintText="Expense"
      hintStyle={styles.floatingLabelStyle}
      underlineStyle={styles.underlineStyle}
    />
    <br />
    <br />
    <TextField  
      hintText="Date"
      hintStyle={styles.floatingLabelStyle}
      underlineStyle={styles.underlineStyle}
    />
    <br />
    <br />
    <TextField  
      hintText="Notes"
      hintStyle={styles.floatingLabelStyle}
      underlineStyle={styles.underlineStyle}
    />
    <br />
    <br />

    <RaisedButton 
      label="Save" 
      backgroundColor={teal100}
      className="saveBtn"
      style={{ fontSize: '1.5rem' }}
    /> 
    
  </div>
);


const ExpensePanel = () => (
  <Paper id="expensePanelContainer">
    <Grid id="expensePanelGrid">
    <Row id="expenseOptionsRow">
      {expenseOptions()}
    </Row>
    

  </Grid>
  </Paper>
);

export default ExpensePanel;