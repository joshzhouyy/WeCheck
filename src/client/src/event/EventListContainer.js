import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectEvent, removeEvent} from './EventActions';
import * as appSelectors from '../app/appReducer';
import * as authSelectors from '../reducers/auth_reducer';
import * as eventSelectors from './eventReducer';

import EventList from './EventList';


const mapStateToProps = (state) => ({
  selectedEventId: appSelectors.getSelectedEventId(state),
  userId: authSelectors.getUserId(state),
  selectedDeleteEventId: eventSelectors.getRemovedEventId(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectEvent, dispatch),
  handleRequestDelete: bindActionCreators(removeEvent, dispatch)
});

const EventListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);

export default EventListContainer



