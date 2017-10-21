import React from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';

import EventBillSumChart from './EventBillSumChart'
import './EventMemberPanel.css'


const raisedBtn = (label) => (
  <RaisedButton label={label} primary={true} className="raisedBtns" />
);

const BillSum = (totalSum) => {
  let info = "Bill Sum: "+ totalSum;
  return (<h3>{info}</h3>);
}

const EventMemberList = () => (
  <div>
    <Subheader>Member List</Subheader>
    <Checkbox
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      label="Xiaohua Shi"
    />
    <Checkbox
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      label="Mengxue Luo"
    />
  </div>
);

const EventMemberPanel = () => (
  <Paper id="eventPanelContainer">
    <Grid id="eventGrid">
      <Row id="eventOuterRow">
        <Col md={9} id="eventInfoCol">
          <Row id="eventBtnRow" className="eventInnerRows">
            <div id="eventBtnContainer">
              {raisedBtn("Input Expense")}
            </div>
          </Row>
          <Row id="eventBillSumRow" className="eventInnerRows">
            {BillSum(50)}
          </Row>
          <Row id="eventBillDetailRow" className="eventInnerRows">
            {EventBillSumChart()}
          </Row>
        </Col>
        <Col md={3} id="eventMemberListCol">
          {EventMemberList()}
        </Col>
      </Row>
    </Grid> 
  </Paper>
);

export default EventMemberPanel;