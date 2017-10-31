import React from 'react';
import autoBind from 'react-autobind';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const DialogBtn = (type, label, handleOpen) => {
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
        <RaisedButton label={label} onClick={handleOpen} />
        );
  }
}


class InputDialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      input: ""
    }
    autoBind(this);
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

  handleSubmit = (onClick, eventId, userId) => {
    this.setState({open: false});
    // console.log(this.state.input);
    onClick(eventId, userId, Number(this.state.input)).then(value => {
      alert("Total amount updated successfully");
    })
  }

  render () {
    // console.log(this.props);
    const type = this.props.type;
    const label = this.props.label;
    const title = this.props.title;
    const onClick = this.props.onClick;
    const eventId = this.props.eventId;
    const userId = this.props.userId;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleSubmit(onClick, eventId, userId)}
      />
    ];

    return (
      <div>
        {DialogBtn(type, label, this.handleOpen)}
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField onChange={(event, input) => this.onChange(event, input)}/>
        </Dialog>
      </div>
    );
  }

}

export default InputDialogBox
