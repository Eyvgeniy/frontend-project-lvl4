import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { fetchMessage } from './messagesSlice';

const mapPropsToState = ({ currentChannelId }) => ({
	currentChannelId,
});

const Form = (props) => {
	const dispatch = useDispatch();

	const { handleSubmit, submitting, pristine } = props;

	const handleSubmitForm = async (values) => {
		const time = new Date().toLocaleString();
		const { reset, currentChannelId } = props;
		const data = {
			user: 'Evgeniy',
			text: values.message,
			time,
		};
		try {
			await dispatch(fetchMessage(data, currentChannelId));
		} catch (e) {
			throw new SubmissionError({ _error: e.message });
		}
		reset();
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className='form-group'>
				<Field name='message' disabled={submitting} required component='textarea' type='text' />
			</div>
			<button type='submit' disabled={submitting || pristine} className='btn btn-primary'>
				Send Message
			</button>
		</form>
	);
};
const ConnectedForm = connect(mapPropsToState)(Form);
export default reduxForm({
	form: 'messageForm',
})(ConnectedForm);
