/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import i18next from 'i18next';
import { fetchMessage } from '../slices/messages';
import UserContext from '../UserContext';

const timeOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const MessageForm = () => {
  const userName = useContext(UserContext);
  const channelId = useSelector((state) => {
    const {
      channels: { actualId },
    } = state;
    return actualId;
  });

  useEffect(() => {
    const input = document.querySelector('.message-input');
    input.focus();
  });

  const validationSchema = Yup.object({
    message: Yup.string().required(i18next.t('errors.message.emptyMessage')),
  });

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, actions) => {
      const time = new Date().toLocaleString('en-US', timeOptions);
      const data = {
        user: userName,
        text: message,
        time,
      };
      fetchMessage(data, channelId);
      actions.resetForm();
    },
    validationSchema,
  });

  return (
    <form id="simpleForm" onSubmit={formik.handleSubmit} className="px-3 pb-1">
      <input
        name="message"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.message}
        className="w-100 message-input"
        disabled={formik.isSubmitting}
      />
      {formik.errors.message && <div className="text-danger">{formik.errors.message}</div>}
    </form>
  );
};

export default MessageForm;
