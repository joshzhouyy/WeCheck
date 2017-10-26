import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectActivePanel} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
  activePanel: appSelectors.getActivePanel(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleTouchTap: bindActionCreators(selectActivePanel, dispatch)
});

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
