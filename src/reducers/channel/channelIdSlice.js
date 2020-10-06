import { createSlice } from '@reduxjs/toolkit';
import { deleteChannel, addChannel } from './channelsSlice';

const generalId = 1;

const currentChannelSlice = createSlice({
  name: 'currenChannelId',
  initialState: '',
  reducers: {
    changeChannel(state, action) {
      const { id } = action.payload;
      return id;
    },
  },
  extraReducers: {
    [deleteChannel]: () => generalId,
    [addChannel]: (state, action) => {
      const { attributes } = action.payload;
      const { id } = attributes;
      return id;
    },
  },
});

export const { changeChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
