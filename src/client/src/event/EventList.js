import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-bootstrap'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton'
import * as colors from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import {getOngoingEvents} from './EventActions';

import "./EventList.css"

const menuOptions = () => (
  <div id="menuOptionsDiv">
    <RaisedButton 
      label="ongoing" 
      backgroundColor={colors.teal100}
      className="menuOptionBtns"
      style={{ fontSize: '1.5rem' }}
    /> 
    <RaisedButton 
      label="finished" 
      backgroundColor={colors.indigo100} 
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
    <ListItem
      className="eventItem"
      key={props.eventId}
      leftAvatar={<Avatar icon={<ActionAssignment />} />}
      primaryText={props.eventName}
      secondaryText={props.eventTime.split("T")[0]}
      onClick={() => props.onClick(event)}
    />
  );
}

const eventItems = (props) => {
  const userId = props.userId;
  const events = props.events;
  const onClick = props.onClick;

  let params = {
    onClick: onClick
  }

  return (
  <List id="eventItems">
    {
      _.map(events, (e) => {
        //TODO: event name attribute?
        // console.log(JSON.stringify(e))
        params.eventName = e.eventName;
        params.eventId = e._id;
        params.isOwner = e.ownerID === userId ? true:false;
        params.eventTime = e.eventTime;
        // console.log(props)
        // console.log(userId)
        return eventItem(params);
      })
    }
  </List>
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
    getOngoingEvents(this.props.userId)
      .then(events => {
        this.setState({
          ongoingEvents: events
        });
      })
  }

  render(){
    const events = this.state.ongoingEvents;
    const userId = this.props.userId;
    const onClick = this.props.onClick;
    
    const props = {
      events: events,
      userId: userId,
      onClick: onClick,
    }

    // console.log(JSON.stringify(this.state))
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

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default EventList;

