import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import initState from '../utils/initState';
import rootReducer from './reducer';

const preloadedState = initState(gon);
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
