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


const eventItem = (props) => (
  <Chip className="eventItem" key = {props.eventName}
    onRequestDelete={() => handleRequestDelete}
    onClick={() => props.onClick(props.eventName)}
    >
    <Avatar color="#444" icon={<SvgIconFace />} />
      {props.eventName}
  </Chip>
);

const eventItems = (events, onClick) => {
  let props = {
    onClick: onClick
  }

  return (
  <div id="eventItems">
    {_.map(events, (e) => {
      props.eventName = e;
      console.log(props)
      return eventItem(props);
    })}
  </div>
  );
}

const eventList = (events, handleRequestDelete, onClick) => (
  <div id="eventListDiv">
    
    {eventItems(events, handleRequestDelete, onClick)}
    
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

const events = ["Event A", "Event B"]

const EventList = ({onClick}) => (
  <Paper id="eventListContainer">
    <Grid id="EventListGrid">
    <Row id="menuOptionsRow">
      {menuOptions()}
    </Row>
    <Row id="eventListRow">
      {eventList(events, onClick)}
    </Row>
  </Grid>
  </Paper>
);

export default EventList;