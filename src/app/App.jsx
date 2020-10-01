import React from 'react';
import {
  Row, Col, Nav, Navbar,
} from 'react-bootstrap';
import io from 'socket.io-client';
import cookie from 'js-cookie';
import Channels from '../features/channels/Channels';
import { addChannel, renameChannel, deleteChannel } from '../features/channels/channelsSlice';
import Form from '../features/messages/Form';
import MessagesList from '../features/messages/MessagesList';
import { addMessage } from '../features/messages/messagesSlice';
import Modal from '../features/modal/Modal';
import Header from '../components/Header';
import createUserName from '../utils/createUserName';
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
      <Row className="flex-nowrap vh-100 flex-column flex-md-row">
        <Col md={3} className="bg-secondary text-light px-0">
          <Navbar expand="md" className="d-flex flex-column flex-fill p-0">
            <div className="d-flex w-100 align-items-center px-3 py-2">
              <span className="mr-auto">
                <h4>Chat</h4>
              </span>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
            <Navbar.Collapse id="basic-navbar-nav" className="w-100">
              <Nav className="d-flex flex-column flex-fill">
                <Channels />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col
          md={9}
          className="d-flex flex-grow-1 flex-column h-100 overflow-hidden p-0 border-right"
        >
          <Header />
          <MessagesList />
          <Form />
        </Col>
      </Row>
      <Modal />
    </>
  );
};

export default App;
