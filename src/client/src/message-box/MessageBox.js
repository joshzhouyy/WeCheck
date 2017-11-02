import React from 'react';
import _ from 'lodash';

import Paper from 'material-ui/Paper'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {grey400, darkBlack} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import "./MessageBox.css"
import {getInvitation, acceptInvitation} from '../event/EventActions';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (confirmLabel, rejectLabel, userId, eventId) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onClick={()=>{handleAcceptInvitation(userId, eventId)}}>{confirmLabel}</MenuItem>
    <MenuItem>{rejectLabel}</MenuItem>
  </IconMenu>
);

const InvitationListItem = (v, userId) => {
  const text = v.ownerAccount + " wants to invite you to Event " + v.eventName;
  const eventId = v._id;
  // console.log(eventId);
  // console.log(userId);
  return (
    <ListItem
      key={v._id}
      rightIconButton={rightIconMenu("Accept", "Reject", userId, eventId)}
      primaryText={text}
    />
  )};

const print = (e) => {
  e.preventDefault();
  console.log("clicked")
}

const handleAcceptInvitation = (userId, eventId) => {
  // console.log(userId)
  // console.log(eventId)
  acceptInvitation(userId, eventId)
    .then(value => {
      alert("Invitation Accepted!");
    })
    .catch((err) => {
      // console.log(JSON.stringify(err));
      const response = err.response;
      const status = response.status;
      const statusText = response.statusText;
      const data = response.data;

      alert(status + ": " + statusText + "\n" + data);
    })
} 

class MessageBox extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      invitations: null,
      userId: props.userId
    }
  }

  componentDidMount() {
    getInvitation(this.state.userId)
      .then(invitations => {
        this.setState({
          invitations: invitations
        });
      });
  }


  render() {
    const invitations = this.state.invitations;
    const userId = this.state.userId;

    console.log(invitations)
    if (invitations === null) 
    {
      return (
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
    }
    else 
    {
      return (
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
                {
                  _.map(invitations, v => {
                    return InvitationListItem(v, userId)
                  })
                }
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
    }
  }
}

export default MessageBox;