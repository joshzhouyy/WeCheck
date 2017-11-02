import { connect } from 'react-redux';
import * as authSelectors from '../reducers/auth_reducer';
import CreateEventPanel from './CreateEventPanel';
import { bindActionCreators } from 'redux';
import {selectActivePanel} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';

const mapStateToProps = (state) => ({
  userId: authSelectors.getUserId(state)
  // userAccount: authSelectors.getUserAccount(state)
  //activePanel: appSelectors.getActivePanel(state)
});


const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectActivePanel, dispatch)
});

const CreateNewEventbtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventPanel);


export default CreateNewEventbtnContainer;
