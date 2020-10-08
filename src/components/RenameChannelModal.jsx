/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { closeModal } from '../reducers/modal/modalsSliсe';
import { renameChannel } from '../reducers/channel/channelRenameStateSlice';
import validate from '../utils/validate';

const mapStateToProps = (state) => {
  const {
    modal: {
      props: { id, name },
    },
    channels,
  } = state;
  const names = channels.map((c) => c.name);
  return { id, name, names };
};

const renderField = (field) => (
  <div className="input-row">
    <input {...field.input} type="text" className="w-100" />
    {field.meta.touched && field.meta.error && (
      <span className="error text-danger">{field.meta.error}</span>
    )}
  </div>
);

const mapDispatch = { closeModal };

const ModalWindow = (props) => {
  const { handleSubmit, submitting, names, id, name, closeModal } = props;
  const dispatch = useDispatch();
  const handleSubmitForm = async ({ channel }) => {
    validate(channel, names);
    await dispatch(renameChannel(channel, id));
    await closeModal();
  };

  const hanleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <Modal show onHide={hanleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`Rename #${name}`}</Modal.Title>
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
              Rename
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
  form: 'renameChanneForm',
})(AddModal);
