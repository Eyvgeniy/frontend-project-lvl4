import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

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
      <ul className="list-unstyled">
        {messages.map((message) => <Message key={message.id} message={message} />)}
      </ul>
    </>
  );
};

export default connect(mapStateToProps)(MessagesList);
