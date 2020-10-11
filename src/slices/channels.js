/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const initId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: [],
    actualId: initId,
  },
  reducers: {
    addChannel(state, action) {
      const { attributes } = action.payload;
      state.actualId = attributes.id;
      state.list.push(attributes);
    },
    renameChannel(state, action) {
      const {
        payload: { attributes },
      } = action;
      const channel = state.list.find((c) => c.id === attributes.id);
      channel.name = attributes.name;
    },
    deleteChannel(state, action) {
      const {
        data: { id },
      } = action.payload;
      state.list = state.list.filter((c) => c.id !== id);
      state.actualId = initId;
    },
    changeChannel(state, action) {
      const { id } = action.payload;
      state.actualId = id;
    },
  },
});

export const {
  addChannel, renameChannel, deleteChannel, changeChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;

export const channelAdd = async (name) => {
  const route = routes.channelsPath();
  const reqBody = { data: { attributes: { name } } };
  try {
    axios.post(route, reqBody);
  } catch (err) {
    throw new Error({ error: err.message });
  }
};

export const channelRename = (name, id) => async () => {
  const route = routes.channelPath(id);
  const reqBody = { data: { attributes: { name } } };
  try {
    axios.patch(route, reqBody);
  } catch (err) {
    throw new Error({ error: err.message });
  }
};

export const channelDelete = (name, id) => async () => {
  const route = routes.channelPath(id);
  const reqBody = { data: { attributes: { name } } };
  try {
    axios.delete(route, reqBody);
  } catch (err) {
    throw new Error({ error: err.message });
  }
};
