// eslint(no-param-reassign)

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
      return { type: 'rename', props: channel };
    },
    showRemoveChannelModal(state, action) {
      const { channel } = action.payload;
      return { type: 'remove', props: channel };
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
