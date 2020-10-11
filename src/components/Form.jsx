/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import i18next from 'i18next';
import { has } from 'lodash';
import { fetchMessage } from '../slices/messages';
import UserContext from '../UserContext';

const mapPropsToState = (state) => {
  const {
    channels: { actualId },
  } = state;
  return { actualId };
};
const timeOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const renderField = (field) => (
  <div className="input-row">
    <input {...field.input} type="text" className="w-100" />
    {field.meta.touched && field.meta.error && (
      <span className="error text-danger">{field.meta.error}</span>
    )}
  </div>
);

const Form = (props) => {
  const {
    handleSubmit, submitting, reset, actualId,
  } = props;
  const dispatch = useDispatch();
  const userName = useContext(UserContext);

  const handleSubmitForm = async (values) => {
    if (!has(values, 'message')) {
      throw new SubmissionError({ message: i18next.t('errors.message.emptyMessage') });
    }

    const time = new Date().toLocaleString('en-US', timeOptions);
    const data = {
      user: userName,
      text: values.message,
      time,
    };
    try {
      await dispatch(fetchMessage(data, actualId));
    } catch (e) {
      throw new SubmissionError({ error: e.message });
    }
    reset();
  };

  return (
    <form className="px-3" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="form-group">
        <Field name="message" disabled={submitting} required component={renderField} type="text" />
      </div>
    </form>
  );
};
const ConnectedForm = connect(mapPropsToState)(Form);

export default reduxForm({
  form: 'messageForm',
})(ConnectedForm);
