import React from 'react';
import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Channels from './features/channels/channels';
import Form from './features/messages/Form';
import MessagesList from './features/messages/MessagesList';
import Modal from './features/modal/Modal';
import rootReducer from './reducer';
import { addMessage } from './features/messages/messagesSlice';
import { addChannel, renameChannel, deleteChannel } from './features/channels/channelsSlice';
import initState from './utils/initState';
import createUserName from './utils/createUserName';
import UserContext from './UserContext';

export default (data) => {
  const userName = cookie.get('userName') || createUserName();
  cookie.set('userName', userName);

  const preloadedState = initState(data);

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
        <Channels />
        <MessagesList />
        <Form />
        <Modal />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
