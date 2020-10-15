import React from 'react';
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

  const formik = useFormik({
    initialValues: {
      channel: data.name,
    },
    onSubmit: (async ({ channel }) => {
      await channelRename(channel, data.id);
    }),
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
            className="w-100"
          />
          {formik.errors.channel && formik.touched.channel ? <div className="text-danger">{formik.errors.channel}</div> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit">
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
