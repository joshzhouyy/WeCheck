import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectCreateNewEvent} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';
import CreateNewEventbtn from './CreateNewEventbtn';


const mapStateToProps = (state) => ({
  activePanel: appSelectors.getActivePanel(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick: bindActionCreators(selectCreateNewEvent, dispatch)
});



const CreateNewEventbtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewEventbtn);

export default CreateNewEventbtnContainer;