export default (data) => {
  const { messages, currentChannelId, channels } = data;
  return {
    messages,
    channels: {
      list: channels,
      actualId: currentChannelId,
    },
  };
};
