import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

import {styles} from './CreateEventPanelStyle'


const splitTypes = ["even", "separate"];
const eventTypes = ["public", "private"];
const eventCategories = ["hotel", "restaurant", "flight"];

const DialogBtn = (type, label, handleOpen, backgroundColor, style) => {
  switch(type) {
    case "primary":
      return (
        <RaisedButton label={label} primary={true} onClick={handleOpen} />
        );
    case "secondary":
      return (
        <RaisedButton label={label} secondary={true} onClick={handleOpen} />
        );
    default:
      return (
        <RaisedButton 
          label={label} 
          backgroundColor={backgroundColor} 
          style={style}
          onClick={handleOpen} />
        );
  }
}

class EditDialogBox extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    const userId = props.userId;
    const event = props.event;

    const splitType = event.splitType;
    const eventType = event.eventType;
    const eventCategory = event.eventCategory;

    const eventName = event.eventName;
    const eventLocation = event.eventLocation;
    const eventTime = event.eventTime;

    // console.log(props);
    
    this.state = {
      open: false,
      userId: userId,
      eventName: eventName,
      eventTime: eventTime,
      eventLocation: eventLocation,
      splitType: splitTypes.indexOf(splitType) + 1,
      eventType: eventTypes.indexOf(eventType) + 1,
      eventCategory: eventCategories.indexOf(eventCategory) + 1
    }
  }

  onChange = (event, input) => {
    // console.log(input);
    this.setState({
      input: input
    });
  };

  handleOpen = () => {
    this.setState({open: true})
  };

  handleCancel = () => {
    this.setState({open: false})
  };

  handleUpdate = (props) => {
    // console.log(JSON.stringify(this.state));
    const event = {
      eventName: this.state.eventName,
      eventType: eventTypes[this.state.eventType-1],
      eventCategory: eventCategories[this.state.eventCategory-1],
      eventTime: this.state.eventTime,
      eventLocation: this.state.eventLocation,
      splitType: splitTypes[this.state.splitType-1],
      eventId: props.eventId
    }

    const onClick = props.onClick;
    const successMsg = props.successMsg;
    const failMsg = props.failMsg;

    onClick(event, this.state.userId)
    .then(value => {
      alert(successMsg);
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      // const status = err.response.status;
      // const statusText = err.response.statusText;
      // alert(failMsg + "\n" + status + " " + statusText);
    })

    this.setState({open: false});

  }

  inputEventName(name) {
    // console.log(name);
    this.setState({
      eventName: name
    });
  }

   inputEventTime(time) {
    // console.log(time);
    this.setState({
      eventTime: new Date(time)
    });
  }

   inputEventLocation(location) {
    // console.log(location);
    this.setState({
      eventLocation: location
    });
  }


  inputEventSplitType(event, index, splitType){
    this.setState({
        splitType: splitType
      });
  }


  inputEventType(event, index, eventType) {
    this.setState({
      eventType: eventType
    });
  }

  inputEventCategory(event, index, eventCategory) {
    this.setState({
      eventCategory: eventCategory
    });
  }



  render (){
    const type = this.props.type;
    const label = this.props.label;
    const title = this.props.title;
    const onClick = this.props.onClick;
    const eventId = this.props.eventId;
    const userId = this.props.userId;
    const id = this.props.id;
    const successMsg = this.props.successMsg;
    const failMsg = this.props.failMsg;

    // console.log(JSON.stringify(this.state))

    const handleUpdateProps = {
      onClick: onClick,
      successMsg: successMsg,
      failMsg: failMsg,
      eventId: eventId
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleUpdate(handleUpdateProps)}
      />
    ];

    return (
      <div className="eventPanelBtns">
        {DialogBtn(type, label, this.handleOpen)}
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText={this.state.eventName}
            floatingLabelText="Event Name"
            floatingLabelFixed={true}
            onChange={(event, input) => this.inputEventName(input)}
            underlineStyle={styles.underlineStyle}
          /><br />
          
          <TextField
            hintText={this.state.eventLocation}
            floatingLabelText="Event Location"
            floatingLabelFixed={true}
            onChange={(event, input) => this.inputEventLocation(input)} 
            underlineStyle={styles.underlineStyle}
          /><br />

          <DatePicker 
              hintText="Event Date" 
              mode="landscape" 
              defaultDate={new Date(this.state.eventTime)}
              onChange={(event, input) => this.inputEventTime(input)}
            />
            <br />

          <p id="splitType" style={styles.floatingLabelStyle} >
            Split Type: 
          </p>
          <DropDownMenu value={this.state.splitType} onChange={this.inputEventSplitType} style={styles.dropdown} >
            <MenuItem value={1} primaryText="even" />
            <MenuItem value={2} primaryText="separate" />
          </DropDownMenu>

          <br />

          <p id="eventType" style={styles.floatingLabelStyle} >
            Event Type: 
          </p>
            

          <DropDownMenu value={this.state.eventType} onChange={this.inputEventType} style={styles.dropdown} >
            <MenuItem value={1} primaryText="public" />
            <MenuItem value={2} primaryText="private" />
          </DropDownMenu>

          <br />
              
          <p id="eventCategory" style={styles.floatingLabelStyle} >
            Event Category: 
          </p>
            

          <DropDownMenu value={this.state.eventCategory} onChange={this.inputEventCategory} style={styles.dropdown} >
            <MenuItem value={1} primaryText={eventCategories[0]} />
            <MenuItem value={2} primaryText={eventCategories[1]} />
            <MenuItem value={3} primaryText={eventCategories[2]} />
          </DropDownMenu>
          <br />
        </Dialog>
      </div>
    );
  }
}

EditDialogBox.propTypes = {
  event: PropTypes.object.isRequired
}


export default EditDialogBox;