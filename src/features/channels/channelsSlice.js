import { createSlice } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';

const channelsSlice = createSlice({
	name: 'channels',
	initialState: { byId: [], allId: [] },
	reducers: {
		addChannel(state, action) {
			const { data } = action.payload;
			state.push({ data });
		},
	},
});

export const { addChannel } = channelsSlice.actions;
export const channels = channelsSlice.reducer;

const currentChannelSlice = createSlice({
	name: 'currenChannelId',
	initialState: '',
	reducers: {
		changeChannel(state, action) {
			const { id } = action.payload;
			return id;
		},
	},
});

export const { changeChannel } = currentChannelSlice.actions;
export const currentChannelId = currentChannelSlice.reducer;
