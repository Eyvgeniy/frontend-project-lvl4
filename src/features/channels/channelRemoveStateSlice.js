import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const channelAddSlice = createSlice({
  name: 'channelRemoveState',
  initialState: 'none',
  reducers: {
    request() {
      return 'request';
    },
    success() {
      return 'success';
    },
    failure() {
      return 'success';
    },
  },
});

export const { request, success, failure } = channelAddSlice.actions;
export default channelAddSlice.reducer;

const removeChannelOnServer = async (name, id) => {
  const route = routes.channelPath(id);
  const reqBody = { data: { attributes: { name } } };
  axios.delete(route, reqBody);
};

export const removeChannel = (name, id) => async (dispatch) => {
  dispatch(request());
  try {
    dispatch(success());
    removeChannelOnServer(name, id);
  } catch (err) {
    dispatch(failure());
    throw new Error({ error: err.message });
  }
};
