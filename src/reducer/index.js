import { combineReducers } from 'redux';
import messages from '../features/messages/messagesSlice';
import { channels, currentChannelId } from '../features/channels/channelsSlice';
import { reducer as formReducer } from 'redux-form';
// import messageFetchStatus from '../features/messages/messagesFetchSlice';

export default combineReducers({
	messages,
	channels,
	currentChannelId,
	form: formReducer,
	// messageFetchStatus,
});
