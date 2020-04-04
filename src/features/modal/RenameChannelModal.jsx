import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { closeModal } from './modalsSliсe';
import { renameChannel } from '../channels/channelRenameStateSlice';

const mapStateToProps = (state) => {
	const {
		modal: {
			props: { id, name },
		},
	} = state;
	return { id, name };
};

const mapDispatch = { closeModal };

const ModalWindow = (props) => {
	const { handleSubmit, submitting, SubmissionError, id, name, closeModal } = props;
	const dispatch = useDispatch();
	const handleSubmitForm = async ({ channel }) => {
		try {
			dispatch(renameChannel(channel, id));
			await closeModal();
		} catch (err) {
			throw err;
		}
	};

	const hanleCloseModal = (e) => {
		e.preventDefault();
		closeModal();
	};

	return (
		<>
			<Modal show>
				<Modal.Header closeButton onClick={hanleCloseModal}>
					<Modal.Title>Rename #{name}</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(handleSubmitForm)}>
					<Form.Group>
						<Modal.Body>
							<Field name='channel' disabled={submitting} required component='input' type='text' />
						</Modal.Body>
					</Form.Group>
					<Modal.Footer>
						<Button variant='secondary' type='submit'>
							Rename
						</Button>
						<Button variant='primary' onClick={hanleCloseModal}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

const AddModal = connect(mapStateToProps, mapDispatch)(ModalWindow);
export default reduxForm({
	form: 'renameChanneForm',
})(AddModal);
