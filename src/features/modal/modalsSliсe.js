import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
	name: 'modal',
	initialState: { type: 'none', props: {} },
	reducers: {
		showAddChannelModal() {
			return { type: 'add', props: {} };
		},
		showRenameChannelModal(state, action) {
			const { channel } = action.payload;
			state.type = 'rename';
			state.props = channel;
		},
		showRemoveChannelModal(state, action) {
			const { channel } = action.payload;
			state.type = 'remove';
			state.props = channel;
		},
		closeModal() {
			return { type: 'none', props: {} };
		},
	},
});

export const {
	showAddChannelModal,
	closeModal,
	showRenameChannelModal,
	showRemoveChannelModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
