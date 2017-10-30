import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CreateEventPanelDialog extends React.Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <EventList
       open={this.state.open} 
       handleOpen={this.handleOpen}
       handleClose={this.handleClose} />

    );
  }
}      

export const dialog = () => (

  <div>
    hey
  </div>  
);