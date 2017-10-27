import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectEvent} from './EventActions';
import * as appSelectors from '../app/appReducer';
import * as authSelectors from '../reducers/auth_reducer';

import EventList from './EventList';

//TODO: load existing events
const mapStateToProps = (state) => ({
  selectedEventId: appSelectors.getSelectedEventId(state),
  userId: authSelectors.getUserId(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectEvent, dispatch)
});

const EventListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);

export default EventListContainer



