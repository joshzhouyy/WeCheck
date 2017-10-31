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
import './CreateEventPanel.css';
import {styles} from './CreateEventPanelStyle'
import autoBind from 'react-autobind';
import {createEvent} from './EventActions';

const splitType = ["even", "separate"];
const eventType = ["public", "private"];
const eventCategory = ["hotel", "restaurant", "flight"];

class CreateEventPanel extends React.Component {
  
  constructor(props, context) {
        super(props, context);
        this.state = {
            eventName: '',
            eventTime: '',
            eventLocation: '',
            splitTypeVal: 1,
            eventTypeVal: 1,
            eventCategoryVal: 1,
            splitType: "even",
            eventType: "public",
            eventCategory: "hotel"
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
    // console.log(time);
    this.setState({
      eventTime: time
    });
  }

   inputEventLocation(location) {
    // console.log(location);
    this.setState({
      eventLocation: location
    });
  }



   inputEventSplitType(value) {
    // console.log(value);
    this.setState({
      splitTypeVal: value,
      splitType: splitType[value-1]
    });
  }

  inputEventType(value) {
    this.setState({
      eventTypeVal: value,
      eventType: eventType[value-1]
    });
  }

  inputEventCategory(value) {
    this.setState({
      eventCategoryVal: value,
      eventCategory: eventCategory[value-1]
    })
  }

  handleCreate() {
    const event = {
      userId: this.props.userId,
      eventName: this.state.eventName,
      eventType: this.state.eventType,
      eventCategory: this.state.eventCategory,
      eventLocation: this.state.eventLocation,
      splitType: this.state.splitType,
      eventCategory: this.state.eventCategory
    }

    createEvent(event)
      .then(data => {
        console.log(JSON.stringify(data))
        alert("Created event successfully");
      });
  }



  render() {
    // console.log(JSON.stringify(this.state));
    
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
                id="eventTime"  
                hintText="Event Time"
                hintStyle={styles.floatingLabelStyle}
                underlineStyle={styles.underlineStyle}
                onChange={(event, input) => this.inputEventTime(input)} 
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
            
            <p id="splitType" style={styles.floatingLabelStyle} >
              Split Type: 
            </p>
          

              <DropDownMenu id="splitType" value={this.state.splitTypeVal} onChange={(event, input) => this.inputEventSplitType(input)}  style={styles.dropdown} >
                <MenuItem value={1} primaryText="even" />
                <MenuItem value={2} primaryText="separate" />
              </DropDownMenu>

              <br />

              <p id="eventType" style={styles.floatingLabelStyle} >
              Event Type: 
              </p>
          

                  <DropDownMenu value={this.state.eventTypeVal} onChange={(event, input) => this.inputEventType(input)} style={styles.dropdown} >
                    <MenuItem value={1} primaryText="public" />
                    <MenuItem value={2} primaryText="private" />
                   
                    
                  </DropDownMenu>

            
               

             <br />
             <p id="eventCategory" style={styles.floatingLabelStyle} >
              Event Type: 
              </p>
          

                  <DropDownMenu value={this.state.eventCategoryVal} onChange={(event, input) => this.inputEventCategory(input)} style={styles.dropdown} >
                    <MenuItem value={1} primaryText={eventCategory[0]} />
                    <MenuItem value={2} primaryText={eventCategory[1]} />
                    <MenuItem value={3} primaryText={eventCategory[2]} />
                   
        
                  </DropDownMenu>

            
               

             <br />
            
            <RaisedButton label="Cancel" style={styles.buttonStyle} />
            <RaisedButton label="Create" style={styles.buttonStyle} onClick={() => {this.handleCreate()}}/>
            
             
      </div>




      
    );
  }
}

export default CreateEventPanel;