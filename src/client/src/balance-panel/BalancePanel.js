import React from 'react'

import Paper from 'material-ui/Paper'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {darkBlack} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'

import "./BalancePanel.css"


const raisedBtn = (label) => (
  <RaisedButton label={label} primary={true} className="raisedBtns" />
);

const BalancePanel = () => (
  <Paper id="balanceContainer">
     <Card id="topCard">
      <CardHeader
        title="Your Balance Info"
        subtitle="Sum: 0 You owed: 50 People owed you: 50"
        actAsExpander={false}
        showExpandableButton={false}
      />
    </Card>
    <Card className="btmCards">
      <CardHeader
        title="You Owed"
        subtitle="Money you owed others"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Card className="innerCards">
          <CardHeader
            title="You Owed A 50 in toatl"
            subtitle="Money you owed A"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <List>
              <ListItem
                rightIconButton={raisedBtn("Send Paid Confirmation")}
                primaryText="Event 1"
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>20</span> --
                    detail info
                  </p>
                }
                secondaryTextLines={1}
              />
              <ListItem
                rightIconButton={raisedBtn("Send Paid Confirmation")}
                primaryText="Event 2"
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>30</span> --
                    detail info
                  </p>
                }
                secondaryTextLines={1}
              />
            </List>
          </CardText>
        </Card>
      </CardText>
    </Card>
    <Card className="btmCards">
      <CardHeader
        title="Who Owed You"
        subtitle="Money others owed you"
        actAsExpander={true}
        showExpandableButton={true}
      />      
      <CardText expandable={true}>
        <Card className="innerCards">
          <CardHeader
            title="B Owed You 50 in toatl"
            subtitle="Money B owed you"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <List>
              <ListItem
                rightIconButton={raisedBtn("Send Reminder")}
                primaryText="Event 1"
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>10</span> --
                    detail info
                  </p>
                }
                secondaryTextLines={1}
              />
              <ListItem
                rightIconButton={raisedBtn("Send Reminder")}
                primaryText="Event 2"
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>40</span> --
                    detail info
                  </p>
                }
                secondaryTextLines={1}
              />
            </List>
          </CardText>
        </Card>
      </CardText>
    </Card>
  </Paper>
 
);


export default BalancePanel;