import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const MessagesList = () => {
  const messages = useSelector((state) => {
    const {
      channels: { actualId },
    } = state;
    return state.messages.filter(({ channelId }) => channelId === actualId);
  });

  return (
    <ul className="list-unstyled overflow-auto flex-grow-1 mt-auto d-flex flex-column-reverse px-3 mb-0">
      {messages.map((message) => <Message key={message.id} message={message} />).reverse()}
    </ul>
  );
};

export default MessagesList;
