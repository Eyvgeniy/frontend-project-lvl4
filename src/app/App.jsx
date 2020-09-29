import React from 'react';
import { Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
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
import Header from '../components/Header';
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
		<>
			{/* <Row className='flex-fill h-100 no-gutters d-flex overflow-hidden'>
				<Col md={3} className='mh-100 border-right bg-light'> */}
			<Row className='flex-nowrap vh-100 flex-column flex-md-row'>
				<Col md={3} className='bg-secondary text-light px-0'>
					<Navbar expand='md' className='d-flex flex-column flex-fill p-0'>
						<div className='d-flex w-100 align-items-center px-3 py-2'>
							<span className='mr-auto'>
								<h4>Chat</h4>
							</span>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
						</div>
						<Navbar.Collapse id='basic-navbar-nav' className='w-100'>
							<Nav className='d-flex flex-column flex-fill'>
								<Channels />
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Col>
				{/* <Col md={9} className='d-flex flex-column overflow-auto vh-100 pb-3 pb-md-2'> */}
				<Col
					md={9}
					className='d-flex flex-grow-1 flex-column h-100 overflow-hidden p-0 border-right'
				>
					<Header />
					<MessagesList />
					<Form />
				</Col>
			</Row>
			<Modal />
			{/* <UserContext.Provider value={userName}>
        <Channels />
        <MessagesList />
        <Form />
        <Modal />
      </UserContext.Provider> */}
		</>
	);
};

export default App;
