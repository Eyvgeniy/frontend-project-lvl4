import { createSlice } from '@reduxjs/toolkit';
import { omit, remove } from 'lodash';
// import { combineReducers } from 'redux';

const channelsSlice = createSlice({
	name: 'channels',
	initialState: { byId: {}, allIds: [] },
	reducers: {
		addChannel(state, action) {
			const { attributes } = action.payload;
			const { id } = attributes;
			state.byId = { ...state.byId, [id]: attributes };
			state.allIds = [...state.allIds, id];
		},
		renameChannel(state, action) {
			const { attributes } = action.payload;
			const { id, name } = attributes;
			state.byId[id].name = name;
		},
		deleteChannel(state, action) {
			const { data } = action.payload;
			const { id } = data;
			state.byId = omit(state.byId, [id]);
			state.allIds = state.allIds.filter((i) => i !== id);
		},
	},
});

export const { addChannel, renameChannel, deleteChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
