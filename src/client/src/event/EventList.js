import React from 'react';
import _ from 'lodash';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import {orange500, blue500, indigo900, black, orange800, orange100, indigo100, teal100, amberA400, red200} from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import FontIcon from 'material-ui/FontIcon'
import SvgIconFace from 'material-ui/svg-icons/action/face'

import {getOngoingEvents} from './EventActions';

import "./EventList.css"

function handleRequestDelete() {
  alert('You clicked the delete button.');
}

const menuOptions = () => (
  <div id="menuOptionsDiv">
    <RaisedButton 
      label="ongoing" 
      backgroundColor={teal100}
      className="menuOptionBtns"
      style={{ fontSize: '1.5rem' }}
    /> 
    <RaisedButton 
      label="finished" 
      backgroundColor={indigo100} 
      className="menuOptionBtns"
      style={{ fontSize: '1.5rem' }}
    />
  </div>
);


const eventItem = (props) => {
  const event = {
    eventId: props.eventId,
    isOwner: props.isOwner
  }

  return (
  <Chip className="eventItem" key = {props.eventId}
    onRequestDelete={() => handleRequestDelete}
    onClick={() => props.onClick(event)}
    >
    <Avatar color="#444" icon={<SvgIconFace />} />
      {props.eventName}
  </Chip>
  );
}

const eventItems = (userId, events, onClick) => {
  let props = {
    onClick: onClick
  }

  return (
  <div id="eventItems">
    {_.map(events, (e) => {
      //TODO: event name attribute?
      props.eventName = e.eventLocation;
      props.eventId = e._id;
      props.isOwner = e.ownerID === userId ? true:false;
      // console.log(props)
      // console.log(userId)
      return eventItem(props);
    })}
  </div>
  );
}

const eventList = (userId, events, onClick, handleRequestDelete) => (
  <div id="eventListDiv">
    
    {eventItems(userId, events, onClick, handleRequestDelete)}
    
    <div id="eventListBtnDiv">
      <RaisedButton 
      label="Create a new event" 
      backgroundColor={orange100}
      className="eventListBtn"
      style={{ fontSize: '1.5rem' }}
      /> 
    </div>
  </div>
);


class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ongoingEvents: [],
      finishedEvents: []
    }
  }

  componentDidMount() {
    // console.log(this.props.userId)
    //TODO:
    // if (this.props.userId !== null) {
      getOngoingEvents(this.props.userId)
      .then(events => {
        this.setState({
          ongoingEvents: events
        });
      })
    // }
  }

  render(){
    const events = this.state.ongoingEvents;
    const onClick = this.props.onClick;
    const userId = this.props.userId;

    console.log(JSON.stringify(this.state))
    return (
      <Paper id="eventListContainer">
        <Grid id="EventListGrid">
        <Row id="menuOptionsRow">
          {menuOptions()}
        </Row>
        <Row id="eventListRow">
          {eventList(userId, events, onClick)}
        </Row>
      </Grid>
      </Paper>
    );
  }
}

export default EventList;