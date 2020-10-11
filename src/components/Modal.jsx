import React from 'react';
import { connect } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import Example from './exampleModal';

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
      return <Example />;
    case 'rename':
      return <Example />;
    case 'remove':
      return <RemoveChannelModal />;
    case 'none':
      return null;
    case 'simple':
      return <Example />;
    default:
      throw Error(`Unknown type of modal ${type}`);
  }
};

export default connect(mapStateToProps)(Modal);
