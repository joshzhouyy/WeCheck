import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectActivePanel} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';
import CreateNewEventbtn from './CreateNewEventbtn';


const mapStateToProps = (state) => ({
  activePanel: appSelectors.getActivePanel(state)
});

const mapDispatchToProps = (dispatch) => {
  const d = ({
  onClick: bindActionCreators(selectActivePanel, dispatch)
})
  console.log(JSON.stringify(d));
  return d;
};

const CreateNewEventbtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewEventbtn);

export default CreateNewEventbtnContainer;