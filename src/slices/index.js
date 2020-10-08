import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messages from './messages';
import channels from './channels';
import modals from './modals';

export default combineReducers({
  messages,
  channels,
  modals,
  form: formReducer,
});
