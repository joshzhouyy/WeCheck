import React from 'react'

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';

import './Dashboard.css';


const Dashboard = () => (
  <Paper id="dashboardContainer">
    <List>
      <Subheader>Dashboard</Subheader>
      <ListItem primaryText="Message Box" rightIcon={<ContentInbox />} />
      <ListItem primaryText="Your Balance" rightIcon={<ActionGrade />} />
    </List>
  </Paper>
);

export default Dashboard;