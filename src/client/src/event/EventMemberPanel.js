import React from 'react';

import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-bootstrap'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import * as colors from 'material-ui/styles/colors';

import EventBillSumChart from './EventBillSumChart';
import DialogBox from './DialogBox';
import InputDialogBox from './InputDialogBox';
import CreateEventPanel from './CreateEventPanel';
import {
  getMemberList, 
  getBillSum, 
  deleteEvent, 
  addTotal,
  inputIndividualExpense
   } from './EventActions';
import './EventMemberPanel.css'



const DeleteEMsg = () => {
  return "Are you sure you want to delete this event?";
}

const BtnGroup = (props) => {
  const isCreator = props.isCreator;
  const deleteEvent = props.deleteEvent;
  const addTotal = props.addTotal;
  const eventId = props.eventId;
  const userId = props.userId;

  const deleteBtnProps = {
        type: "secondary",
        label: "Delete",
        title: "Delete Event",
        info: DeleteEMsg,
        onClick: deleteEvent,
        eventId: eventId,
        id: "deleteId"
  }

  const addBtnProps = {
    type: "primary",
    label: "Add",
    title: "Add Total Amount",
    onClick: addTotal,
    eventId: eventId,
    userId: userId,
    id: "addBtn"
  }

  const inputBtnProps = {
    type: "primary",
    label: "Input",
    title: "Input Individual Expense",
    onClick: inputIndividualExpense,
    eventId: eventId,
    userId: userId,
    id: "inputBtn"
  }

  const editBtnProps = {
    type: "default",
    label: "Edit",
    title: "Edit Event",
    info: () => (CreateEventPanel),
    onClick: addTotal,
    eventId: eventId,
    id: "editBtn"
  }

  if (!isCreator) {
    return (
      <div id="memberBtnsDiv">
        <InputDialogBox className="raisedBtns" {...inputBtnProps}/>
        <DialogBox className="creatorBtns" {...deleteBtnProps} />
      </div>  
    );
  } else {
      return (
        <div id="creatorBtnsDiv">
          <InputDialogBox className="creatorBtns" {...addBtnProps} />
          <DialogBox className="creatorBtns" {...editBtnProps} />
          <DialogBox className="creatorBtns" {...deleteBtnProps} />
        </div>

      );  
    
  }
}

const BillSum = (totalSum) => {
  let info = "Bill Sum: "+ totalSum;
  return (<h3>{info}</h3>);
}


const CreatorMemberListBtns = () => {
  return (
  <div id="memberListButtonDiv">
    <RaisedButton 
      label="+" 
      backgroundColor={colors.teal100}
      className="creatorMemberListBtns"
      style={{ fontSize: '1.5rem' }}
    /> 
    <RaisedButton 
      label="-" 
      backgroundColor={colors.indigo100} 
      className="creatorMemberListBtns"
      style={{ fontSize: '1.5rem' }}
    />
  </div>
  );
}

const MemberListBtns = () => {
  return (
    <div id="memberListButtonDiv">
      <RaisedButton 
        label="+" 
        backgroundColor={colors.teal100}
        className="memberAddBtn"
        style={{ fontSize: '1.5rem' }}
      /> 
      
    </div>
  );
}

const Member = (memberName) => {
  return (
    <ListItem 
      key={memberName}
      primaryText={memberName}
    />
  );
}


const EventMemberList = (memberListProps) => {
  const isCreator = memberListProps.isCreator;
  const members = memberListProps.members;

  if (!isCreator) {
    return (
      <List id="memberListContainerDiv">
        <Subheader>Member List</Subheader>
        {
          _.map(members, (m) => {
            return Member(m.userAccount);
          })
        }
        <MemberListBtns />
      </List>
      );
  } else {
    return (  
      <div id="memberListContainerDiv">
        <Subheader>Member List</Subheader>
        {
          _.map(members, (m) => {
            return Member(m.userAccount);
          })
        }
        <CreatorMemberListBtns />
      </div>
    );
  }

}
  


class EventMemberPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      billSum: 0
    }
  }

  componentDidMount() {
    const eventId = this.props.selectedEventId;
    const p1 = getBillSum(eventId);
    const p2 = getMemberList(eventId);
    Promise.all([p1,p2]).then(values => {
      this.setState({
        billSum: values[0],
        members: values[1]
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const eventId = nextProps.selectedEventId;
    const p1 = getBillSum(eventId);
    const p2 = getMemberList(eventId);
    Promise.all([p1,p2]).then(values => {
      // console.log(values[1])
      this.setState({
        billSum: values[0],
        members: values[1]
      });
    });
  }

  render (){
    // console.log("in render" + JSON.stringify(this.props));
    const isCreator = this.props.isCreator;
    const eventId = this.props.selectedEventId;
    const userId = this.props.userId;
    const members = this.state.members;
    const billSum = this.state.billSum;


    const memberListProps = {
      isCreator: isCreator,
      members: members
    }

    const btnGroupProps = {
      isCreator: isCreator,
      deleteEvent: deleteEvent,
      addTotal: addTotal,
      eventId: eventId,
      userId: userId
    }

    return (
      <Paper id="eventPanelContainer">
        <Grid id="eventGrid">
          <Row id="eventOuterRow">
            <Col md={9} id="eventInfoCol">
              <Row id="eventBtnRow" className="eventInnerRows">
                <div id="eventBtnContainer">                
                    {BtnGroup(btnGroupProps)}                
                </div>
              </Row>
              <Row id="eventBillSumRow" className="eventInnerRows">
                {BillSum(billSum)}
              </Row>
              <Row id="eventBillDetailRow" className="eventInnerRows">
                {EventBillSumChart()}
              </Row>
            </Col>
            <Col md={3} id="eventMemberListCol">
                {EventMemberList(memberListProps)}
            </Col>
          </Row>
        </Grid> 
      </Paper>
    );
  }
}

export default EventMemberPanel;