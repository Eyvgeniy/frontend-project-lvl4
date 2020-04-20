import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchMessage } from './messagesSlice';
import UserContext from '../../UserContext';

const mapPropsToState = ({ currentChannelId }) => ({
  currentChannelId,
});

const Form = (props) => {
  const { handleSubmit, submitting, SubmissionError } = props;
  const dispatch = useDispatch();
  const userName = useContext(UserContext);

  const handleSubmitForm = async (values) => {
    const time = new Date().toLocaleString();
    const { reset, currentChannelId } = props;
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
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="form-group">
        <Field name="message" disabled={submitting} required component="input" type="text" />
      </div>
    </form>
  );
};
const ConnectedForm = connect(mapPropsToState)(Form);
export default reduxForm({
  form: 'messageForm',
})(ConnectedForm);
