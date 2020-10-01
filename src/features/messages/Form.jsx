import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { has } from 'lodash';
import { fetchMessage } from './messagesSlice';
import UserContext from '../../UserContext';

const mapPropsToState = ({ currentChannelId }) => ({
  currentChannelId,
});
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
  const { handleSubmit, submitting } = props;
  const dispatch = useDispatch();
  const userName = useContext(UserContext);
  const { reset, currentChannelId } = props;

  const handleSubmitForm = async (values) => {
    if (!has(values, 'message')) {
      throw new SubmissionError({ message: 'Can`t send empty message' });
    }

    const time = new Date().toLocaleString('en-US', timeOptions);
    const data = {
      user: userName,
      text: values.message,
      time,
    };
    try {
      await dispatch(fetchMessage(data, currentChannelId));
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
  // validate,
})(ConnectedForm);
