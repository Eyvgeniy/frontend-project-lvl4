import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18next from 'i18next';
import { useFormik } from 'formik';
import { channelRename } from '../slices/channels';
import { closeModal } from '../slices/modals';

const ModalRename = () => {
  const data = useSelector(({ channels }) => {
    const names = channels.list.map((c) => c.name);
    const id = channels.actualId;
    const { name } = channels.list.find((c) => c.id === channels.actualId);
    return { names, name, id };
  });

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    channel: Yup.string()
      .required(i18next.t('errors.channel.emptyName'))
      .notOneOf(data.names, i18next.t('errors.channel.existName'))
      .max(15, i18next.t('errors.channel.longName'))
      .matches(/^[a-z0-9]+$/, i18next.t('errors.channel.alphanumeric')),
  });

  const input = useRef();
  useEffect(() => {
    input.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channel: data.name,
    },
    onSubmit: async ({ channel }, actions) => {
      try {
        await channelRename(channel, data.id);
      } catch (e) {
        console.log(e);
        actions.setErrors({ message: i18next.t('errors.channel.internet') });
        actions.setSubmitting(false);
      }
    },
    validationSchema,
  });

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <input
            name="channel"
            type="text"
            ref={input}
            onChange={formik.handleChange}
            value={formik.values.channel}
            className="w-100 modal-input"
            disabled={formik.isSubmitting}
          />
          {formik.errors.channel && <div className="text-danger">{formik.errors.channel}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" disabled={formik.isSubmitting}>
            Rename
          </Button>
          <Button variant="primary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalRename;
