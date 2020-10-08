/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modal',
  initialState: { type: 'none', props: {} },
  reducers: {
    showAddChannelModal(state) {
      state.type = 'add';
      state.props = {};
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
    closeModal(state) {
      state.type = 'none';
      state.props = {};
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
