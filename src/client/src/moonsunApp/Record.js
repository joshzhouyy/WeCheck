import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const Record = () => (
  <div id="expenseRecordDiv">
    <Table id="eventBillSumTable">
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
      <TableRow>
        <TableHeaderColumn>Date</TableHeaderColumn>        
        <TableHeaderColumn>Expense</TableHeaderColumn>
        <TableHeaderColumn>Category</TableHeaderColumn>
          

      </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
      >
      <TableRow>          
        <TableRowColumn>09/14</TableRowColumn>        
        <TableRowColumn>$16.99</TableRowColumn>
        <TableRowColumn>Restaurant</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>09/16</TableRowColumn>        
        <TableRowColumn>$14.99</TableRowColumn>
        <TableRowColumn>Hotel</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>09/20</TableRowColumn>        
        <TableRowColumn>$13.20</TableRowColumn>
        <TableRowColumn>Flight</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>09/22</TableRowColumn>        
        <TableRowColumn>$18.24</TableRowColumn>
        <TableRowColumn>Restaurant</TableRowColumn>
      </TableRow>
      </TableBody>
    </Table> 

    
    
  </div>
);

export default Record
