import { combineReducers } from 'redux';
import messages from './messages';
import channels from './channels';
import modals from './modals';

export default combineReducers({
  messages,
  channels,
  modals,
});
