import React from 'react'

import Paper from 'material-ui/Paper'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {grey400, darkBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import "./MessageBox.css"

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (confirmLabel, rejectLabel) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>{confirmLabel}</MenuItem>
    <MenuItem>{rejectLabel}</MenuItem>
  </IconMenu>
);

const MessageBox = () => (
  <Paper id="MsgBoxContainer">
    <Card id="topCard">
      <CardHeader
        title="Message Box"
        actAsExpander={false}
        showExpandableButton={false}
      />
    </Card>
    <Card className="btmCards">
      <CardHeader
        title="Invitations"
        subtitle="Event Invitations"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <List>
          <ListItem
            rightIconButton={rightIconMenu("Accept", "Reject")}
            primaryText="A wants to invite you to Event 1"
          />
          <ListItem
            rightIconButton={rightIconMenu("Accept", "Reject")}
            primaryText="B wants to invite you to Event 2"
          />
        </List>
      </CardText>
    </Card>
    <Card className="btmCards">
      <CardHeader
        title="Confirmations"
        subtitle="Payment Confirmations"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <List>
          <ListItem
            rightIconButton={rightIconMenu("Confirm", "Reject")}
            primaryText="A paid you 20 for event 1"
          />
          <ListItem
            rightIconButton={rightIconMenu("Confirm", "Reject")}
            primaryText="B paid you 10 for Event 2"
          />
        </List>
      </CardText>
    </Card>
    <Card className="btmCards">
      <CardHeader
        title="Reminders"
        subtitle="Debt Reminders"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <List>
          <ListItem
            primaryText="A debt reminder sent from A"
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>You still owed A 20</span>
              </p>
            }
            secondaryTextLines={1}
          />
          <ListItem
            primaryText="A debt reminder sent from C"
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>You still owed C 5</span>
              </p>
            }
            secondaryTextLines={1}
          />
        </List>
      </CardText>
    </Card>
  </Paper>
);

export default MessageBox;