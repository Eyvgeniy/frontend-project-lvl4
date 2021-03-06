import React from 'react';

const Message = (props) => {
  const {
    message: { text, user, time },
  } = props;

  return (
    <li className="my-1">
      <span className="font-weight-bold">{`${user} `}</span>
      <span>{time}</span>
      <p className="m-0">{text}</p>
    </li>
  );
};

export default Message;
