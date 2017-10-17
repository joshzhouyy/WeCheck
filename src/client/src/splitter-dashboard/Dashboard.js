import React from 'react'

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';

const Dashboard = () => (
  <div>
    <Paper>
      <List>
        <Subheader>Dashboard</Subheader>
        <ListItem primaryText="Your Balance" rightIcon={<ActionGrade />} />
      </List>
    </Paper>
  </div>
);

export default Dashboard;