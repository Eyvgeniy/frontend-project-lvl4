/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
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

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={async ({ message }, actions) => {
        const time = new Date().toLocaleString('en-US', timeOptions);
        const data = {
          user: userName,
          text: message,
          time,
        };
        await fetchMessage(data, channelId);
        actions.resetForm();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
    >
      {(props) => (
        <form id="simpleForm" onSubmit={props.handleSubmit} className="px-3 pb-1">
          <input
            name="message"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.message}
            className="w-100 message-input"
          />
          {props.errors.message && props.touched.message ? (
            <div className="text-danger">{props.errors.message}</div>
          ) : null}
        </form>
      )}
    </Formik>
  );
};

export default MessageForm;
