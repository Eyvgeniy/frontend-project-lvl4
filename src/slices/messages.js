/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { deleteChannel } from './channels';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { attributes } = action.payload;
      return [...state, attributes];
    },
  },
  extraReducers: {
    [deleteChannel]: (state, action) => {
      const { data } = action.payload;
      const { id } = data;
      return state.filter((m) => m.channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

export const fetchMessage = async (data, id) => {
  const route = routes.channelMessagesPath(id);
  const reqBody = { data: { attributes: { ...data } } };
  try {
    axios.post(route, reqBody);
  } catch (err) {
    throw new Error({ error: err.message });
  }
};
