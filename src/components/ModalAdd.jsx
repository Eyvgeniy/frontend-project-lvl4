import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import i18next from 'i18next';
import { useFormik } from 'formik';
import { channelAdd } from '../slices/channels';
import { closeModal } from '../slices/modals';

const ModalAdd = () => {
  const names = useSelector(({ channels }) => channels.list.map((c) => c.name));

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    channel: Yup.string()
      .required(i18next.t('errors.channel.emptyName'))
      .notOneOf(names, i18next.t('errors.channel.existName'))
      .max(15, i18next.t('errors.channel.longName'))
      .matches(/^[a-z0-9]+$/, i18next.t('errors.channel.alphanumeric')),
  });

  useEffect(() => {
    const input = document.querySelector('.modal-input');
    input.focus();
  });

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async ({ channel }) => {
      await channelAdd(channel);
    },
    validationSchema,
  });

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <input
            name="channel"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
            className="w-100 modal-input"
            disabled={formik.isSubmitting}
          />
          {formik.errors.channel && formik.touched.channel ? (
            <div className="text-danger">{formik.errors.channel}</div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" disabled={formik.isSubmitting}>
            Add
          </Button>
          <Button variant="primary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAdd;
