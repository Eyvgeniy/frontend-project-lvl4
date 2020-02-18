import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { currentChannelId } from '../channels/channelsSlice';

const mapStateToProps = (state) => {
	const messages = state.messages.allMessages;
	const { currentChannelId } = state;
	// console.log(messages, currentChanneId);
	const currentMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
	return { messages: currentMessages };
};

const MessagesList = (props) => {
	const { messages } = props;
	return (
		<>
			<p>
				<b>Messages List</b>
			</p>
			<ul className='list-unstyled'>
				{messages.map((message) => {
					return <Message key={message.id} message={message} />;
				})}
			</ul>
		</>
	);
};

export default connect(mapStateToProps)(MessagesList);
