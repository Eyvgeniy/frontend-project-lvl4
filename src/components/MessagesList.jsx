import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';

const mapStateToProps = (state) => {
  const { messages } = state;
  const {
    channels: { actualId },
  } = state;
  const currentMessages = messages.filter(({ channelId }) => channelId === actualId);
  return { messages: currentMessages };
};

const MessagesList = (props) => {
  const { messages } = props;

  return (
    <ul className="list-unstyled overflow-auto flex-grow-1 mt-auto d-flex flex-column-reverse px-3 mb-0">
      {messages.map((message) => <Message key={message.id} message={message} />).reverse()}
    </ul>
  );
};

export default connect(mapStateToProps)(MessagesList);
