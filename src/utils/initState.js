import { keyBy } from 'lodash';

export default (data) => {
  const { messages, currentChannelId, channels } = data;
  return {
    messages: {
      fetchStatus: 'none',
      allMessages: messages,
    },
    channels: {
      byId: keyBy(channels, 'id'),
      allIds: channels.map((t) => t.id),
    },
    currentChannelId,
  };
};
