import React from 'react';
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

function handleTouchTap() {
  alert('You clicked the Chip.');
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

const eventList = () => (
  <div id="eventListDiv">
    <Chip
      onRequestDelete={handleRequestDelete}
      >
      <Avatar color="#444" icon={<SvgIconFace />} />
      This is the name of the event 1
    </Chip>
    <Chip
      onRequestDelete={handleRequestDelete}
    >
      <Avatar color="#444" icon={<SvgIconFace />} />
      This is the name of the event 2
  </Chip>
  </div>
);

const EventList = () => (
  <Paper id="eventListContainer">
    <Grid id="EventListGrid">
    <Row id="menuOptionsRow">
      {menuOptions()}
    </Row>
    <Row id="eventListRow">
      {eventList()}
    </Row>
  </Grid>
  </Paper>
);

export default EventList;