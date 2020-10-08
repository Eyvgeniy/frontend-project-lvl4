/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as yup from 'yup';
import { closeModal } from '../slices/modals';
import { channelAdd } from '../slices/channels';
import validate from '../utils/validate';

const mapStateToProps = (state) => {
  const {
    channels: { list },
  } = state;
  const names = list.map((c) => c.name);
  return { names };
};

const mapDispatch = { closeModal };

const renderField = (field) => (
  <div className="input-row">
    <input {...field.input} type="text" className="w-100" />
    {field.meta.touched && field.meta.error && (
      <span className="error text-danger">{field.meta.error}</span>
    )}
  </div>
);

const ModalWindow = (props) => {
  const { handleSubmit, submitting, closeModal, names } = props;
  const validSchema = yup.object({
    channel: yup.string().required().length(15),
  });
  console.log(validSchema);
  const handleSubmitForm = async ({ channel }) => {
    validate(channel, names);
    await channelAdd(channel);
    closeModal();
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
              <Field
                name="channel"
                disabled={submitting}
                required
                component={renderField}
                type="text"
              />
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

const AddModal = connect(mapStateToProps, mapDispatch)(ModalWindow);
export default reduxForm({
  form: 'addChannelForm',
})(AddModal);
