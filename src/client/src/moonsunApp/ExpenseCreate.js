import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

var state = {value: 1};

const handleChange = (event, index, value) => this.setState({value});

const expenseCreate = () => (
  <div id="expenseCreateDiv">
    

    <RaisedButton 
      label="Create New" 
      backgroundColor={teal100}
      className="createBtn"
      style={{ fontSize: '1.5rem' }}
    /> 
    <br />

    <DropDownMenu id= "viewDropdown" value={state.value} onChange={handleChange}  >
      <MenuItem value={1} primaryText="View by Date" />
      <MenuItem value={2} primaryText="View by Expense" />
      <MenuItem value={3} primaryText="View by Category" />
          
    </DropDownMenu>
    <br />
    <br />
    
  </div>
);

export default expenseCreate;