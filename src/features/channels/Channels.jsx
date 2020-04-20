import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { addChannel } from './channelsSlice';
import { changeChannel } from './channelIdSlice';
import { addNewChannel } from './channelAddStateSlice';
import {
  showAddChannelModal,
  showRenameChannelModal,
  showRemoveChannelModal,
} from '../modal/modalsSliсe';

const mapStateToProps = (state) => {
  const {
    currentChannelId,
    channels: { byId, allIds },
  } = state;
  const channels = allIds.map((id) => byId[id]);
  const currentChannel = byId[currentChannelId];
  return { channels, currentChannel };
};

const mapDispatch = { changeChannel };

const Channels = ({ channels, changeChannel, currentChannel }) => {
  const dispatch = useDispatch();

  const changeCurrentChannel = (id) => (e) => {
    e.preventDefault();
    changeChannel({ id });
  };

  const showAddModal = (e) => {
    e.preventDefault();
    dispatch(showAddChannelModal());
  };

  const showRenameModal = (channel) => (e) => {
    e.preventDefault();
    dispatch(showRenameChannelModal({ channel }));
  };
  const showRemoveModal = (channel) => (e) => {
    e.preventDefault();
    dispatch(showRemoveChannelModal({ channel }));
  };

  return (
    <>
      <p>
        <b>Channels List</b>
      </p>
      <ul className="list-unstyled">
        {channels.map(({ id, name }) => (
          <li key={id}>
            <a href="#" onClick={changeCurrentChannel(id)}>
              <b>{name}</b>
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-primary mr-1" onClick={showAddModal}>
        Add
      </button>
      {currentChannel.removable ? (
        <button
          type="button"
          className="btn btn-secondary mr-1"
          onClick={showRenameModal(currentChannel)}
        >
          Rename
        </button>
      ) : null}
      {currentChannel.removable ? (
        <button type="button" className="btn btn-success" onClick={showRemoveModal(currentChannel)}>
          Remove
        </button>
      ) : null}
    </>
  );
};
export default connect(mapStateToProps, mapDispatch)(Channels);
