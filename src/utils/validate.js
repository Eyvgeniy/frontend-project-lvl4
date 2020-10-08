import { SubmissionError } from 'redux-form';
import i18next from 'i18next';

const isLowerCase = (str) => str === str.toLowerCase();

export default (channel, names) => {
  if (!channel) {
    throw new SubmissionError({ channel: i18next.t('errors.channel.emptyName') });
  }
  if (channel && names.includes(channel)) {
    throw new SubmissionError({ channel: i18next.t('errors.channel.existName') });
  }
  if (channel && channel.length > 15) {
    throw new SubmissionError({ channel: i18next.t('errors.channel.longName') });
  }
  if ((channel && !channel.match(/^[a-z0-9]+$/)) || !isLowerCase(channel)) {
    throw new SubmissionError({
      channel: i18next.t('errors.channel.alphanumeric'),
    });
  }
};
