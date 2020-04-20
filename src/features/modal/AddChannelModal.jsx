import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { closeModal } from './modalsSliсe';
import { addNewChannel } from '../channels/channelAddStateSlice';

const mapDispatch = { closeModal };

const ModalWindow = (props) => {
  const { handleSubmit, submitting, SubmissionError, closeModal } = props;
  const dispatch = useDispatch();
  const handleSubmitForm = async ({ channel }) => {
    await dispatch(addNewChannel(channel));
    await closeModal();
  };

  const hanleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <Modal show onHide={hanleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Channel</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Form.Group>
            <Modal.Body>
              <Field name="channel" disabled={submitting} required component="input" type="text" />
            </Modal.Body>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Add Channel
            </Button>
            <Button variant="primary" onClick={hanleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const AddModal = connect(null, mapDispatch)(ModalWindow);
export default reduxForm({
  form: 'addChannelForm',
})(AddModal);
