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
    const event = {
      userId: this.props.userId,
      eventName: this.state.eventName,
      eventType: eventType[this.state.eventType-1],
      eventCategory: eventCategory[this.state.eventCategory-1],
      eventLocation: this.state.eventLocation,
      splitType: splitType[this.state.splitType-1]
    }

    createEvent(event)
      .then(data => {
        console.log(JSON.stringify(data))
        alert("Created event successfully");
      });
  }



  render() {
    console.log(JSON.stringify(this.state));
    
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
            
            <RaisedButton label="Cancel" style={styles.buttonStyle} />
            <RaisedButton label="Create" style={styles.buttonStyle} onClick={() => {this.handleCreate()}} />
            
             
      </div>




      
    );
  }
}

export default CreateEventPanel;