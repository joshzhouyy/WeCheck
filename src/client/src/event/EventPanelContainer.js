import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appSelectors from '../app/appReducer';
import * as authSelectors from '../reducers/auth_reducer';
import * as eventSelectors from './eventReducer';
import {removeEvent, updatedTotal} from './EventActions';
import EventMemberPanel from './EventMemberPanel';

const mapStateToProps = (state) => ({
  isCreator: appSelectors.getUserIdentity(state),
  selectedEventId: appSelectors.getSelectedEventId(state),
  userId: authSelectors.getUserId(state),
  eventName: appSelectors.getSelectedEventName(state),
  updatedTotal: eventSelectors.getUpdatedTotal(state)
});

const mapDispatchToProps = (dispatch) => ({
  updatedTotal: bindActionCreators(updatedTotal, dispatch)
});

const EventPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMemberPanel);

export default EventPanelContainer;