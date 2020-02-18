import React from 'react';
import ReactDom from 'react-dom';
import routes from './routes';
import axios from 'axios';
import MessageLists from './features/messages/MessagesList';
import UserContext from './UserContext';

(async (text) => {
  const route = routes.channelMessagesPath(1);
  const reqBody = { data: { attributes: { text } } }
  const response = await axios.post(route, reqBody);
  await console.log(response);
})('Hello world');


export default (data) => {

  const { channels, messages } = data

  class Channels extends React.Component {
    render() {
      const { channels, messages } = this.props;
      return (
        <>
          <ul>
            {channels.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
          <MessageLists messages={messages} />

        </>
      )
    }
  }

  ReactDom.render(
    <Channels channels={channels} messages={messages} />,
    document.getElementById('chat'),
  )
}