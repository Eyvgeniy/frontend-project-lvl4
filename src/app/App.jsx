import React from 'react';
// import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
// import 'bootstrap/digit sst/css/bootstrap.min.css';
import Channels from '../features/channels/Channels';
import { addChannel, renameChannel, deleteChannel } from '../features/channels/channelsSlice';
import Form from '../features/messages/Form';
import MessagesList from '../features/messages/MessagesList';
import { addMessage } from '../features/messages/messagesSlice';
import Modal from '../features/modal/Modal';
import createUserName from '../utils/createUserName';
import UserContext from '../UserContext';
import store from './store';

const App = () => {
  const userName = cookie.get('userName') || createUserName();
  cookie.set('userName', userName);

  const socket = io.connect('http://localhost:5000');

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

  return (
    <UserContext.Provider value={userName}>
      <Channels />
      <MessagesList />
      <Form />
      <Modal />
    </UserContext.Provider>
  );
};

export default App;
