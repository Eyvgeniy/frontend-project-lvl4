import React from 'react';
import { connect } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import SimpleModal from './SimpleModal';

const mapStateToProps = (state) => {
  const {
    modals: { type, props },
  } = state;
  return { type, props };
};

const Modal = ({ type, props }) => {
  const getInitialValue = () => ({ channel: props.name });

  switch (type) {
    case 'add':
      return <AddChannelModal />;
    case 'rename':
      return <RenameChannelModal initialValues={getInitialValue()} />;
    case 'remove':
      return <RemoveChannelModal />;
    case 'none':
      return null;
    case 'simple':
      return <SimpleModal title="Simple Modal" btn="Simple" />;
    default:
      throw Error(`Unknown type of modal ${type}`);
  }
};

export default connect(mapStateToProps)(Modal);
