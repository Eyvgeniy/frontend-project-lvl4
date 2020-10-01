import { SubmissionError } from 'redux-form';

const isLowerCase = (str) => str === str.toLowerCase();

export default (channel, names) => {
  if (!channel) {
    throw new SubmissionError({ channel: 'Channel name can`t be empty' });
  }
  if (channel && names.includes(channel)) {
    throw new SubmissionError({ channel: 'This channel name already exist.' });
  }
  if (channel && channel.length > 15) {
    throw new SubmissionError({ channel: 'Can`t be longer than 15 symbols.' });
  }
  if (channel && !channel.match(/^[a-z0-9]+$/) || !isLowerCase(channel)) {
    throw new SubmissionError({ channel: 'Channel name must be alphanumeric, in English and lowercase' });
  }
}