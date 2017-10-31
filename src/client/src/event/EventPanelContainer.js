import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appSelectors from '../app/appReducer';
import * as authSelectors from '../reducers/auth_reducer';
import {removeEvent} from './EventActions';
import EventMemberPanel from './EventMemberPanel';

const mapStateToProps = (state) => ({
  isCreator: appSelectors.getUserIdentity(state),
  selectedEventId: appSelectors.getSelectedEventId(state),
  userId: authSelectors.getUserId(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteEvent: bindActionCreators(removeEvent, dispatch)
});

const EventPanelContainer = connect(
  mapStateToProps
)(EventMemberPanel);

export default EventPanelContainer;