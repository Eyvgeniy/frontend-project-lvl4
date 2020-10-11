import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { closeModal } from '../slices/modals';

const simpleModal = ({ children, title, btn }) => {
  const dispatch = useDispatch();

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="submit" form="simpleForm">
          {btn}
        </Button>
        <Button variant="primary" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default simpleModal;
