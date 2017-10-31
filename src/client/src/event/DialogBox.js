import React from 'react';
import autoBind from 'react-autobind';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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


class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    autoBind(this);
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleCancel = () => {
    this.setState({open: false})
  };

  handleSubmit = (onClick, eventId) => {
    this.setState({open: false});
    onClick(eventId).then(value => {
      alert(value.message);
    })
  }

  render () {
    // console.log(this.props);
    const type = this.props.type;
    const label = this.props.label;
    const title = this.props.title;
    const info = this.props.info;
    const onClick = this.props.onClick;
    const eventId = this.props.eventId;
    const id = this.props.id;

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
        onClick={() => this.handleSubmit(onClick, eventId)}
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
        {info()}
        </Dialog>
      </div>
    );
  }

}

export default DialogBox