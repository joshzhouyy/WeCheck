import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import './CreateEventPanel.css';
import {styles} from './CreateEventPanelStyle'
import autoBind from 'react-autobind';
import {createEvent} from './EventActions';


const splitType = ["even", "separate"];
const eventType = ["public", "private"];
const eventCategory = ["hotel", "restaurant", "flight"];

const alertMsg = (fieldName) => {
  alert(fieldName + " cannot be empty!!");
}

class CreateEventPanel extends React.Component {
  
  constructor(props) {

        super(props);
        console.log("what is props");
        console.log(props);
        this.state = {
            ownerID: props.userId,
            eventName: '',
            eventTime: new Date(),
            eventLocation: '',
            splitType:1,
            eventType: 1,
            eventCategory:1
        };
        autoBind(this);
    }




  inputEventName(name) {
    // console.log(name);
    this.setState({
      eventName: name
    });
  }

   inputEventTime(time) {
    console.log(time);
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

  handleCreate() {

    const eventName = this.state.eventName;
    const eventTime = this.state.eventTime;
    const eventLocation = this.state.eventLocation;

    const event = {
      ownerID: this.state.ownerID,
      eventName: eventName,
      eventTime: eventTime,
      eventType: eventType[this.state.eventType-1],
      eventCategory: eventCategory[this.state.eventCategory-1],
      eventLocation: eventLocation,
      splitType: splitType[this.state.splitType-1],
      invitationList: []
    }

    console.log(event);
    const failMsg = "Failed to create this event...";
    const successMsg = "Event created!!";


    if (eventName === "") {
      alertMsg("Event Name");
    }
    else if (eventTime === "") {
      alertMsg("Event Time");
    }
    else if (eventLocation === "") {
      alertMsg("Event Location");
    }
    else {
      createEvent(event)
      .then(data => {
        // console.log(JSON.stringify(data))
        alert(successMsg);
      })
      .catch((err) => {
        // console.log(JSON.stringify(err));
        const status = err.response.status;
        const statusText = err.response.statusText;
        const data = err.response.data
        alert(failMsg + "\n" + status + " " + statusText + " " + data);
      });
    }
  }



  render() {
    // console.log(JSON.stringify(this.state));
    const onClick = this.props.onClick;
    console.log(this.state);
    return (       
      <div id = "pageDiv">
            <h1>CREATE PAGE</h1>
            <h2>Start a New Event</h2>
            <br />

            <TextField  
                id="eventName"
                hintText="Event Name"
                hintStyle={styles.floatingLabelStyle}
                underlineStyle={styles.underlineStyle}
                onChange={(event, input) => this.inputEventName(input)}    
            />

            <br />
            <TextField
                id="eventLocation"    
                hintText="Event Location"
                hintStyle={styles.floatingLabelStyle}
                underlineStyle={styles.underlineStyle}
                onChange={(event, input) => this.inputEventLocation(input)} 
            />
            <br />
            
            <DatePicker 
              hintText="Event Date" 
              mode="landscape" 
              defaultDate={new Date()}
              onChange={(event, input) => this.inputEventTime(input)}
            />
            <br />

            <p id="splitType" style={styles.floatingLabelStyle} >
              Split Type: 
            </p>
          
              <DropDownMenu value={this.state.splitType} onChange={this.inputEventSplitType}  style={styles.dropdown} >
                <MenuItem value={1} primaryText="even" />
                <MenuItem value={2} primaryText="separate" />
              </DropDownMenu>

              <br />

              <p id="eventType" style={styles.floatingLabelStyle} >
              Event Type: 
              </p>
          

                  <DropDownMenu value={this.state.eventType}  onChange={this.inputEventType} style={styles.dropdown} >
                    <MenuItem value={1} primaryText="public" />
                    <MenuItem value={2} primaryText="private" />
                   
                    
                  </DropDownMenu>

            
               

             <br />
             <p id="eventCategory" style={styles.floatingLabelStyle} >
              Event Type: 
              </p>
          

                  <DropDownMenu value={this.state.eventCategory} onChange={this.inputEventCategory} style={styles.dropdown} >
                    <MenuItem value={1} primaryText="hotel" />
                    <MenuItem value={2} primaryText="restaurant" />
                    <MenuItem value={3} primaryText="flight" />
                   
        
                  </DropDownMenu>

            
               

             <br />
            
            <RaisedButton label="Cancel" style={styles.buttonStyle} onClick={() => onClick("MESSAGE_BOX")}/>
            <RaisedButton label="Create" style={styles.buttonStyle} onClick={() => {this.handleCreate()}} />
            
             
      </div>

      
    );
  }
}

export default CreateEventPanel;