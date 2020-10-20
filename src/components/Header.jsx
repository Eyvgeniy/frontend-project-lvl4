import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { showModal } from '../slices/modals';

const Header = () => {
  const dispatch = useDispatch();

  const currentChannel = useSelector((state) => {
    const {
      channels: { actualId, list },
    } = state;
    return list.find((c) => c.id === actualId);
  });

  const showRenameModal = (channel) => (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'rename', props: channel }));
  };

  const showRemoveModal = (channel) => (e) => {
    e.preventDefault();
    dispatch(showModal({ type: 'remove', props: channel }));
  };

  return (
    <div className="d-flex  p-2 bg-light border-bottom">
      <div className="p-1 lead flex-fill">{`#${currentChannel.name}`}</div>
      {currentChannel.removable && (
        <>
          <Button variant="light" className="p-1" onClick={showRenameModal(currentChannel)}>
            rename
          </Button>
          <Button
            variant="light"
            className="p-1 d-flex align-items-center"
            onClick={showRemoveModal(currentChannel)}
          >
            <svg height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340.1 340.1">
              <path d="M306.1 45.4l-68-0.3V36.6c0-20.2-18.5-36.6-41.4-36.6h-53.1c-22.9 0-41.5 16.4-41.5 36.6v8.7l-68 0v45.4h23.4c-0.4 3.6-0.7 7.3-0.7 11v181.6c0 29.9 14.5 56.8 45.4 56.8h136.1c30.8 0 45.4-26.9 45.4-56.8V101.8c0-3.7-0.2-7.4-0.5-11h23.1C306.1 90.8 306.1 45.4 306.1 45.4zM124.7 36.6c0-7.6 8.6-13.9 18.8-13.9h53.1c10.2 0 18.8 6.4 18.8 13.9v8.7h-90.7v-8.7H124.7zM260.8 283.3c0 17.4-4.3 34.1-22.7 34.1H102c-18.3 0-22.7-16.6-22.7-34.1v-181.6c0-3.8 0.2-7.5 0.8-11h179.9c0.5 3.5 0.8 7.2 0.8 11v181.6H260.8zM102 294.8h22.7V113.4h-22.7V294.8zM158.7 294.8h22.7V113.4h-22.7V294.8zM215.4 294.8h22.7V113.4h-22.7V294.8z" />
            </svg>
            <span>delete</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Header;
