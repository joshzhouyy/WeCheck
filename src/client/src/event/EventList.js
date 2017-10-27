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
    onRequestDelete={() => props.handleRequestDelete(props.eventId)}
    onClick={() => props.onClick(event)}
    >
    <Avatar color="#444" icon={<SvgIconFace />} />
      {props.eventName}
  </Chip>
  );
}

const eventItems = (props) => {
  const userId = props.userId;
  const events = props.events;
  const onClick = props.onClick;
  const handleRequestDelete = props.handleRequestDelete;

  let params = {
    onClick: onClick,
    handleRequestDelete: handleRequestDelete
  }

  return (
  <div id="eventItems">
    {_.map(events, (e) => {
      //TODO: event name attribute?
      params.eventName = e.eventLocation;
      params.eventId = e._id;
      params.isOwner = e.ownerID === userId ? true:false;
      // console.log(props)
      // console.log(userId)
      return eventItem(params);
    })}
  </div>
  );
}

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
    //TODO: add userId check
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
    const handleRequestDelete = this.props.handleRequestDelete;
    
    const props = {
      events: events,
      userId: userId,
      onClick: onClick,
      handleRequestDelete: handleRequestDelete
    }

    console.log(JSON.stringify(this.state))
    return (
      <Paper id="eventListContainer">
        <Grid id="EventListGrid">
        <Row id="menuOptionsRow">
          {menuOptions()}
        </Row>
        <Row id="eventListRow">
          <div id="eventListDiv">
            {eventItems(props)}
          </div>
        </Row>
      </Grid>
      </Paper>
    );
  }
}

export default EventList;