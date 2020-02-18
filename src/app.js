import React from 'react';
import ReactDom from 'react-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import axios from 'axios';
import { Provider } from 'react-redux';
import Channels from './features/channels/channels';
import Form from './features/messages/Form';
import MessagesList from './features/messages/MessagesList';
import rootReducer from './reducer';
import { addChannel } from './features/channels/channelsSlice';
import routes from './routes';
import { addMessage } from './features/messages/messagesSlice';
import initState from './utils/initState';

export default (data) => {
	const preloadedState = initState(data);

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: preloadedState,
	});
	const socket = io.connect('http://localhost:5000');

	socket.on('newMessage', ({ data: { attributes } }) => {
		store.dispatch(addMessage({ attributes }));
	});

	ReactDom.render(
		<Provider store={store}>
			<Channels />
			<MessagesList />
			<Form />
		</Provider>,
		document.getElementById('chat'),
	);

	// (async (text) => {
	// 	const route = routes.channelMessagesPath(1);
	// 	const reqBody = { data: { attributes: { text } } };
	// 	const response = await axios.post(route, reqBody);
	// })('Hello world');
};
