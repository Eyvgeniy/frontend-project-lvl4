import React from 'react';
import { useSelector } from 'react-redux';
import ModalAdd from './ModalAdd';
import ModalRename from './ModalRename';
import ModalDelete from './ModalDelete';

const Modal = () => {
  const { type } = useSelector((state) => state.modals);

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

export default Modal;
