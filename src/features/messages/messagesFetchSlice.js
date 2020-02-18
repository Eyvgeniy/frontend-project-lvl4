import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const messagesSlice = createSlice({
	name: 'messagesFetchStatus',
	initialState: '',
	reducers: {
		MESSAGE_FETCH_REQUEST() {
			return 'REQUEST';
		},
		MESSAGE_FETCH_SUCCESS() {
			return 'SUCCESS';
		},
		MESSAGE_FETCH_FAILURE() {
			return 'FAILURE';
		},
	},
});

export const {
	MESSAGE_FETCH_REQUEST,
	MESSAGE_FETCH_SUCCESS,
	MESSAGE_FETCH_FAILURE,
} = messagesSlice.actions;
export default messagesSlice.reducer;

const sendMessageToServer = async (data) => {
	const route = routes.channelMessagesPath(1);
	const reqBody = { data: { attributes: { ...data } } };
	const response = await axios.post(route, reqBody);
};

export const fetchMessage = (data) => async (dispatch) => {
	dispatch(MESSAGE_FETCH_REQUEST());
	try {
		dispatch(MESSAGE_FETCH_SUCCESS());
		sendMessageToServer(data);
	} catch (err) {
		dispatch(MESSAGE_FETCH_FAILURE());
		throw err;
	}
};
