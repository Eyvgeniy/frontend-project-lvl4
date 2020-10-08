/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannel(state, action) {
      const { attributes } = action.payload;
      state.push(attributes);
    },
    renameChannel(state, action) {
      const {
        payload: { attributes },
      } = action;
      const channel = state.find((c) => c.id === attributes.id);
      channel.name = attributes.name;
    },
    deleteChannel(state, action) {
      const {
        data: { id },
      } = action.payload;
      return state.filter((c) => c.id !== id);
    },
  },
});

export const { addChannel, renameChannel, deleteChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
