import 'core-js/stable';
import 'regenerator-runtime/runtime';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
import App from './components/App';
import UserContext from './UserContext';
import createUserName from './utils/createUserName';
import initState from './utils/initState';
import rootReducer from './reducers';
import { addChannel, renameChannel, deleteChannel } from './reducers/channel/channelsSlice';
import { addMessage } from './reducers/messages/messagesSlice';

const init = (gon) => {
  const userName = cookie.get('userName') || createUserName();
  cookie.set('userName', userName);

  const preloadedState = initState(gon);
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const socket = io();

  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessage({ attributes }));
  });

  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannel({ attributes }));
  });

  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel({ attributes }));
  });

  socket.on('removeChannel', ({ data }) => {
    store.dispatch(deleteChannel({ data }));
  });

  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
