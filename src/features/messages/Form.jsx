import React, { useContext, useRef, useEffect } from 'react';
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
	const inputEl = useRef(null);
	const { reset, currentChannelId } = props;

	const handleSubmitForm = async (values) => {
		const time = new Date().toLocaleString();
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

	useEffect(() => {
		inputEl.current.focus();
	});

	const renderField = (field) => (
		<div className='input-row'>
			<input {...field.input} ref={inputEl} type='text' />
			{field.meta.touched && field.meta.error && <span className='error'>{field.meta.error}</span>}
		</div>
	);

	return (
		<form className='px-3' onSubmit={handleSubmit(handleSubmitForm)}>
			<div className='form-group'>
				<Field
					autoFocus
					name='message'
					disabled={submitting}
					required
					component={renderField}
					type='text'
				/>
			</div>
		</form>
	);
};
const ConnectedForm = connect(mapPropsToState)(Form);
export default reduxForm({
	form: 'messageForm',
})(ConnectedForm);
