import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { showRenameChannelModal, showRemoveChannelModal } from '../features/modal/modalsSliсe';

const mapStateToProps = (state) => {
  const {
    currentChannelId,
    channels: { byId },
  } = state;
  const currentChannel = byId[currentChannelId];
  return { currentChannel };
};
const Header = ({ currentChannel }) => {
  const dispatch = useDispatch();
  const showRenameModal = (channel) => (e) => {
    e.preventDefault();
    dispatch(showRenameChannelModal({ channel }));
  };
  const showRemoveModal = (channel) => (e) => {
    e.preventDefault();
    dispatch(showRemoveChannelModal({ channel }));
  };

  return (
    <div>
      <div>{currentChannel.name}</div>
      <>
        {currentChannel.removable && (
          <>
            <Button variant="outline-secondary" onClick={showRenameModal(currentChannel)}>
              rename
            </Button>
            <Button variant="outline-danger" onClick={showRemoveModal(currentChannel)}>
              delete
            </Button>
          </>
        )}
      </>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
