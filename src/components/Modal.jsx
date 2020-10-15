import React from 'react';
import { connect } from 'react-redux';
import ModalAdd from './ModalAdd';
import ModalRename from './ModalRename';
import ModalDelete from './ModalDelete';

const mapStateToProps = (state) => {
  const {
    modals: { type },
  } = state;
  return { type };
};

const Modal = ({ type }) => {
  switch (type) {
    case 'add':
      return <ModalAdd />;
    case 'rename':
      return <ModalRename />;
    case 'remove':
      return <ModalDelete />;
    case 'none':
      return null;
    default:
      throw Error(`Unknown type of modal ${type}`);
  }
};

export default connect(mapStateToProps)(Modal);
