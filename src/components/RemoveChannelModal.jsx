/* eslint-disable no-shadow */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import i18next from 'i18next';
import { useDispatch, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { closeModal } from '../slices/modals';
import { channelDelete } from '../slices/channels';

const mapStateToProps = (state) => {
  const {
    modals: {
      props: { id, name },
    },
  } = state;
  return { id, name };
};

const mapDispatch = { closeModal };

const ModalWindow = (props) => {
  const { handleSubmit, id, name, closeModal } = props;
  const dispatch = useDispatch();
  const handleSubmitForm = async ({ channel }) => {
    await dispatch(channelDelete(channel, id));
    await closeModal();
  };

  return (
    <>
      <Modal show onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{`Remove #${name}`}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Form.Group>
            <Modal.Body>{i18next.t('modals.deleteChannel', { name })}</Modal.Body>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Remove
            </Button>
            <Button variant="primary" onClick={() => closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const AddModal = connect(mapStateToProps, mapDispatch)(ModalWindow);
export default reduxForm({
  form: 'removeChanneForm',
})(AddModal);
