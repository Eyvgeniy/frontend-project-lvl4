import React from 'react';
import {
  Row, Col, Nav, Navbar,
} from 'react-bootstrap';
import Channels from './Channels';
import Form from './Form';
import MessagesList from './MessagesList';
import Modal from './Modal';
import Header from './Header';

const App = () => (
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

export default App;
