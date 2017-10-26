import React from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import './Dashboard.css';


const Dashboard = ({handleTouchTap, activePanel}) => {
  // console.log(activePanel)
  return (
  <Paper id="dashboardContainer">
    <List>
      <Subheader>Dashboard</Subheader>
      <ListItem primaryText="Message Box" rightIcon={<ContentInbox />} onClick={() => handleTouchTap("MESSAGE_BOX")} />
      <ListItem primaryText="Your Balance" rightIcon={<ActionGrade />} onClick={() => handleTouchTap("BALANCE")} />
    </List>
  </Paper>
);}

Dashboard.propTypes = {
  handleTouchTap: PropTypes.func.isRequired
}

export default Dashboard;