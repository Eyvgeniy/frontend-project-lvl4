import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18next from 'i18next';
import { channelDelete } from '../slices/channels';
import { closeModal } from '../slices/modals';

const ModalRename = () => {
  const data = useSelector(({ channels }) => {
    const id = channels.actualId;
    const { name } = channels.list.find((c) => c.id === channels.actualId);
    return { name, id };
  });

  const { name } = data;
  let error = null;

  const handleClick = () => {
    try {
      channelDelete(name, data.id);
    } catch (e) {
      console.log(e);
      error = i18next.t('errors.channel.internet');
    }
  };

  const dispatch = useDispatch();

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18next.t('modals.deleteChannel', { name })}
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClick}>
          Delete
        </Button>
        <Button variant="primary" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRename;
