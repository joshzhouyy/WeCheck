import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectEvent} from './EventActions';
import * as appSelectors from '../app/appReducer';
import * as authSelectors from '../reducers/auth_reducer';
import * as eventSelectors from './eventReducer';

import EventList from './EventList';


const mapStateToProps = (state) => ({
  selectedEventId: appSelectors.getSelectedEventId(state),
  userId: authSelectors.getUserId(state),
  eventListDefaultValue: appSelectors.getEventListDefaultValue(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectEvent, dispatch),
});

const EventListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);

export default EventListContainer



