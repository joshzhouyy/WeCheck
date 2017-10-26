import { connect } from 'react-redux';

import {selectActivePanel} from '../app/AppActions';
import * as appSelectors from '../app/appReducer';
import ActivePanel from './ActivePanel';

const mapStateToProps = (state, ownProps) => ({
  activePanel: appSelectors.getActivePanel(state)
});


export default connect(mapStateToProps)(ActivePanel)