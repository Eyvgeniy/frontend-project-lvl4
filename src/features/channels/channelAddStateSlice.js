import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const channelAddSlice = createSlice({
	name: 'channelAddState',
	initialState: 'none',
	reducers: {
		request() {
			return 'request';
		},
		success() {
			return 'success';
		},
		failure() {
			return 'success';
		},
	},
});

export const { request, success, failure } = channelAddSlice.actions;
export default channelAddSlice.reducer;

const sendNewChannelToServer = async (name) => {
	const route = routes.channelsPath();
	const reqBody = { data: { attributes: { name } } };
	axios.post(route, reqBody);
};

export const addNewChannel = (name) => async (dispatch) => {
	dispatch(request());
	try {
		dispatch(success());
		sendNewChannelToServer(name);
	} catch (err) {
		dispatch(failure());
		throw new Error({ error: err.message });
	}
};
