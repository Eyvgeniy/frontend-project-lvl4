/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modal',
  initialState: { type: 'none', props: {} },
  reducers: {
    showModal(state, { payload }) {
      return payload;
    },
    closeModal(state) {
      state.type = 'none';
      state.props = {};
    },
  },
});

export const { showModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
