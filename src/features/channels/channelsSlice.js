import { createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [] },
  reducers: {
    addChannel(state, action) {
      const { attributes } = action.payload;
      const { id } = attributes;
      const newState = {};
      newState.byId = { ...state.byId, [id]: attributes };
      newState.allIds = [...state.allIds, id];
      return newState;
    },
    renameChannel(state, action) {
      const {
        payload: { attributes },
      } = action;
      return { ...state, byId: { ...state.byId, [attributes.id]: attributes } };
    },
    deleteChannel(state, action) {
      const { data } = action.payload;
      const { id } = data;
      const updateState = {};
      updateState.byId = omit(state.byId, [id]);
      updateState.allIds = state.allIds.filter((i) => i !== id);
      return updateState;
    },
  },
});

export const { addChannel, renameChannel, deleteChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
