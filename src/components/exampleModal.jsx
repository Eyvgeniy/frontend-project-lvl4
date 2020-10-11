import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import i18next from 'i18next';
import SimpleModal from './SimpleModal';
import SimpleForm from './SimpleForm';
import { channelAdd, channelDelete, channelRename } from '../slices/channels';

const modalMap = {
  add: {
    action: channelAdd,
    title: 'Add channel',
    btn: 'Add channel',
    open: true,
  },
  rename: {
    action: channelRename,
    title: 'Rename channel',
    btn: 'Rename channel',
    open: true,
  },
  none: {
    open: null,
  },
};

const example = () => {
  const data = useSelector(({ channels, modals }) => {
    const names = channels.list.map((c) => c.name);
    const { type, props } = modals;
    return { names, type, props };
  });
  const modalData = modalMap[data.type];

  if (!modalData.open) {
    return null;
  }

  const validationSchema = Yup.object({
    channel: Yup.string()
      .required(i18next.t('errors.channel.emptyName'))
      .notOneOf(data.names, i18next.t('errors.channel.existName'))
      .max(15, i18next.t('errors.channel.longName'))
      .matches(/^[a-z0-9]+$/, i18next.t('errors.channel.alphanumeric')),
  });

  return (
    <SimpleModal title={modalData.title} btn={modalData.btn}>
      <SimpleForm
        action={modalData.action}
        validationSchema={validationSchema}
        channelData={data.props}
      />
    </SimpleModal>
  );
};

export default example;
