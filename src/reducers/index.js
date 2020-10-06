import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messages from './messages/messagesSlice';
import channels from './channel/channelsSlice';
import currentChannelId from './channel/channelIdSlice';
import channelAddState from './channel/channelAddStateSlice';
import channelRenameState from './channel/channelRenameStateSlice';
import channelRemoveState from './channel/channelRemoveStateSlice';
import modal from './modal/modalsSliсe';

export default combineReducers({
  messages,
  currentChannelId,
  channels,
  channelAddState,
  channelRenameState,
  channelRemoveState,
  modal,
  form: formReducer,
});
