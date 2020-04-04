import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messages from '../features/messages/messagesSlice';
import channels from '../features/channels/channelsSlice';
import currentChannelId from '../features/channels/channelIdSlice';
import channelAddState from '../features/channels/channelAddStateSlice';
import channelRenameState from '../features/channels/channelRenameStateSlice';
import channelRemoveState from '../features/channels/channelRemoveStateSlice';
import modal from '../features/modal/modalsSliсe';
// import messageFetchStatus from '../features/messages/messagesFetchSlice';

export default combineReducers({
	messages,
	currentChannelId,
	channels,
	channelAddState,
	channelRenameState,
	channelRemoveState,
	modal,
	form: formReducer,
	// messageFetchStatus,
});
