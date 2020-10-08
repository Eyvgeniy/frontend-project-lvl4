export default (data) => {
  const { messages, currentChannelId, channels } = data;
  return {
    messages: {
      fetchStatus: 'none',
      allMessages: messages,
    },
    channels,
    currentChannelId,
  };
};
