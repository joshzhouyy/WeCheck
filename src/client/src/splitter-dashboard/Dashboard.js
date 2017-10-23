import React from 'react'

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import './Dashboard.css';


const handleTouchTap = (item) => {
  console.log(item + " was selected\n")
  let selectedItem = item
  return selectedItem
}

const Dashboard = () => (
  <Paper id="dashboardContainer">
    <List>
      <Subheader>Dashboard</Subheader>
      <ListItem primaryText="Message Box" rightIcon={<ContentInbox />} onClick={(e) => handleTouchTap("MESSAGE_BOX")} />
      <ListItem primaryText="Your Balance" rightIcon={<ActionGrade />} onClick={(e) => handleTouchTap("BALANCE")} />
    </List>
  </Paper>
);

export default Dashboard;