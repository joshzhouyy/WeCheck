import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectEvent} from './EventActions';
import * as eventSelectors from './eventReducer';
import EventList from './EventList';

//TODO: load existing events
const mapStateToProps = (state) => ({
  selectedEventId: eventSelectors.getSelectedEventId(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectEvent, dispatch)
});

const EventListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList);

export default EventListContainer



