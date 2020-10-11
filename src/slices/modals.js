/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { addChannel, renameChannel, deleteChannel } from './channels';

const initialState = { type: 'none', props: {} };

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      return payload;
    },
    closeModal() {
      return initialState;
    },
  },
  extraReducers: {
    [addChannel]: () => initialState,
    [renameChannel]: () => initialState,
    [deleteChannel]: () => initialState,
  },
});

export const { showModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
