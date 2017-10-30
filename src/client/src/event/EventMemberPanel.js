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
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'

import EventBillSumChart from './EventBillSumChart'
import {getMemberList, getBillSum} from './EventActions';
import './EventMemberPanel.css'


const updateCheck = () => {
  
  this.setState((oldState) => {
    return {
      checked: !oldState.checked,

    };
  });
}

const buttonClicked = () => {
  
    alert('You clicked the button.');
    console.log('works fine');
    
    //console.log('this is:', this);
}


const raisedBtn = (isCreator) => {
  if (!isCreator) {
    return (
      <div id="memberBtnsDiv">
        <RaisedButton label={'Input Expense'} primary={true} className="raisedBtns" />
      </div>  
    );
  } else {
      return (
      
        <div id="creatorBtnsDiv">
          <RaisedButton label={'Add'} primary={true} className="creatorBtns" />
          <RaisedButton label={'Verify'} secondary={true} className="creatorBtns" />
          <RaisedButton label={'Edit'} primary={true} className="creatorBtns" />
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
      backgroundColor={teal100}
      className="creatorMemberListBtns"
      style={{ fontSize: '1.5rem' }}
      onClick={buttonClicked.bind(this)}
    /> 
    <RaisedButton 
      label="-" 
      backgroundColor={indigo100} 
      className="creatorMemberListBtns"
      style={{ fontSize: '1.5rem' }}
      onClick={buttonClicked.bind(this)}
    />
  </div>
  );
}

const MemberListBtns = () => {
  return (
    <div id="memberListButtonDiv">
      <RaisedButton 
        label="+" 
        backgroundColor={teal100}
        className="memberAddBtn"
        style={{ fontSize: '1.5rem' }}
        onClick={buttonClicked.bind(this)}
      /> 
      
    </div>
  );
}

const Member = (memberName) => {
  return (
    <Checkbox
      key = {memberName}
      checkedIcon={<ActionFavorite />}
      uncheckedIcon={<ActionFavoriteBorder />}
      label={memberName}
      defaultChecked={false}
      onCheck={updateCheck}
    />
  );
}


const EventMemberList = (isCreator, members) => {
  if (!isCreator) {
    return (
      <div id="memberListContainerDiv">
      <Subheader>Member List</Subheader>
        {
          _.map(members, (m) => {
            return Member(m.userAccount);
          })
        }
        <MemberListBtns />
      </div>
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
    console.log(this.props);
    console.log(nextProps);
    const eventId = nextProps.selectedEventId;
    const p1 = getBillSum(eventId);
    const p2 = getMemberList(eventId);
    Promise.all([p1,p2]).then(values => {
      console.log(values[1])
      this.setState({
        billSum: values[0],
        members: values[1]
      });
    });
  }

  render (){
    // console.log("in render" + JSON.stringify(this.props));
    const isCreator = this.props.isCreator;
    const members = this.state.members;
    const billSum = this.state.billSum;
    return (
      <Paper id="eventPanelContainer">
        <Grid id="eventGrid">
          <Row id="eventOuterRow">
            <Col md={9} id="eventInfoCol">
              <Row id="eventBtnRow" className="eventInnerRows">
                <div id="eventBtnContainer">                
                    {raisedBtn(isCreator)}                
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
                {EventMemberList(isCreator, members)}
            </Col>
          </Row>
        </Grid> 
      </Paper>
    );
  }
}

export default EventMemberPanel;