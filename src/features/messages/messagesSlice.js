import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const messagesSlice = createSlice({
	name: 'messages',
	initialState: { fetchStatus: 'none', allMessages: [] },
	reducers: {
		addMessage(state, action) {
			const { attributes } = action.payload;
			state.allMessages = [attributes, ...state.allMessages];
		},
		MESSAGE_FETCH_REQUEST(state) {
			state.fetchStatus = 'REQUEST';
		},
		MESSAGE_FETCH_SUCCESS(state) {
			state.fetchStatus = 'SUCCESS';
		},
		MESSAGE_FETCH_FAILURE(state) {
			state.fetchStatus = 'FAILURE';
		},
	},
});

export const {
	addMessage,
	MESSAGE_FETCH_REQUEST,
	MESSAGE_FETCH_SUCCESS,
	MESSAGE_FETCH_FAILURE,
} = messagesSlice.actions;
export default messagesSlice.reducer;

const sendMessageToServer = async (data, id) => {
	const route = routes.channelMessagesPath(id);
	const reqBody = { data: { attributes: { ...data } } };
	const response = await axios.post(route, reqBody);
};

export const fetchMessage = (data, id) => async (dispatch) => {
	dispatch(MESSAGE_FETCH_REQUEST());
	try {
		dispatch(MESSAGE_FETCH_SUCCESS());
		sendMessageToServer(data, id);
	} catch (err) {
		dispatch(MESSAGE_FETCH_FAILURE());
		throw err;
	}
};
