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
  inputIndividualExpense,
  deleteMember,
  inviteMember
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
        id: "deleteId",
        successMsg: "Event deleted!",
        failMsg: "Fail to delete this event..."
  }

  const addBtnProps = {
    type: "primary",
    label: "Add",
    title: "Add Total Amount",
    onClick: addTotal,
    eventId: eventId,
    userId: userId,
    id: "addBtn",
    successMsg: "Updated total amount!",
    failMsg: "Fail to update total amount..."
  }

  const inputBtnProps = {
    type: "primary",
    label: "Input",
    title: "Input Individual Expense",
    onClick: inputIndividualExpense,
    eventId: eventId,
    userId: userId,
    id: "inputBtn",
    successMsg: "Input successfully",
    failMsg: "Fail to input expense..."
  }

  const editBtnProps = {
    type: "default",
    label: "Edit",
    title: "Edit Event",
    info: () => ("Edit Panel"),
    onClick: addTotal,
    eventId: eventId,
    id: "editBtn",
    successMsg: "Updated event successfully!",
    failMsg: "Fail to update event..."
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


const CreatorMemberListBtns = ({eventId, userId}) => {
  const inviteMemberBtnProps = {
    type: "default",
    label: "+",
    title: "Invite a Member",
    onClick: inputIndividualExpense,
    eventId: eventId,
    userId: userId,
    id: "inviteMemberBtn",
    backgroundColor:colors.teal100,
    style:{ fontSize: '1.5rem' },
    successMsg: "Invitation sent!",
    failMsg: "Failed to send invitation..."
  };

  const deleteMemberBtnProps = {
    type: "default",
    label: "-",
    title: "Delete a Member",
    onClick: deleteMember,
    eventId: eventId,
    userId: userId,
    id: "deleteMemberBtn",
    backgroundColor:colors.indigo100,
    style:{ fontSize: '1.5rem' },
    successMsg: "Member removed!",
    failMsg: "Fail to remove this member..."
  };

  return (
  <div id="memberListButtonDiv">
    <InputDialogBox 
      className="creatorMemberListBtns"
      {...inviteMemberBtnProps}
    /> 
    <InputDialogBox 
      className="creatorMemberListBtns"
      {...deleteMemberBtnProps}
    />
  </div>
  );
}

const MemberListBtns = ({eventId, userId}) => {
  const inviteMemberBtnProps = {
    type: "default",
    label: "+",
    title: "Invite a Member",
    onClick: inputIndividualExpense,
    eventId: eventId,
    userId: userId,
    id: "inviteMemberBtn",
    backgroundColor:colors.teal100,
    style:{ fontSize: '1.5rem' },
    successMsg: "Invitation sent!",
    failMsg: "Failed to send invitation..."
  };

  return (
    <div id="memberListButtonDiv">
      <InputDialogBox 
        className="memberListBtns"
        {...inviteMemberBtnProps}
      /> 
    </div>
  );
}

const Member = (memberName, userId) => {
  return (
    <ListItem 
      key={userId}
      primaryText={memberName}
    />
  );
}


const EventMemberList = (memberListProps) => {
  const isCreator = memberListProps.isCreator;
  const members = memberListProps.members;
  const eventId = memberListProps.eventId;
  const userId = memberListProps.userId;

  const btnProps = {
    eventId: eventId,
    userId: userId
  }

  // if (!isCreator) {
  //   return (
  //     <List id="memberListContainerDiv">
  //       <Subheader>Member List</Subheader>
  //       {
  //         _.map(members, (m) => {
  //           return Member(m.userAccount, m._id);
  //         })
  //       }
  //       <MemberListBtns {...btnProps}/>
  //     </List>
  //     );
  // } else {
    return (  
      <div id="memberListContainerDiv">
        <Subheader>Member List</Subheader>
        {
          _.map(members, (m) => {
            return Member(m.userAccount, m._id);
          })
        }
        <CreatorMemberListBtns {...btnProps}/>
      </div>
    );
  // }

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
    const eventName = this.props.eventName;

    const members = this.state.members;
    const billSum = this.state.billSum;


    const memberListProps = {
      isCreator: isCreator,
      members: members,
      eventId: eventId,
      userId: userId
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
          <Row id="eventNameRow">
            <strong id="eventName">{eventName}</strong>
          </Row>
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