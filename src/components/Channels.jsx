import React, { useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import cn from 'classnames';
import { showAddChannelModal } from '../modal/modalsSliсe';
import UserContext from '../../UserContext';
import { changeChannel } from './channelIdSlice';

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

// eslint-disable-next-line no-shadow
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

  const userName = useContext(UserContext);

  return (
    <>
      <div className="mb-2 d-flex">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="24px" className="pl-2">
          <path
            d="M 16 5 C 12.145852 5 9 8.1458513 9 12 C 9 14.408843 10.23116 16.55212 12.09375 17.8125 C 8.5266131 19.342333 6 22.881262 6 27 L 8 27 C 8 22.569334 11.569334 19 16 19 C 20.430666 19 24 22.569334 24 27 L 26 27 C 26 22.881262 23.473387 19.342333 19.90625 17.8125 C 21.76884 16.55212 23 14.408843 23 12 C 23 8.1458513 19.854148 5 16 5 z M 16 7 C 18.773268 7 21 9.2267317 21 12 C 21 14.773268 18.773268 17 16 17 C 13.226732 17 11 14.773268 11 12 C 11 9.2267317 13.226732 7 16 7 z"
            fill="#fff"
          />
        </svg>
        <span>{userName}</span>
      </div>
      <div className="d-flex px-3">
        <span>
          <b>Channels</b>
        </span>
        <Button variant="link" className="ml-auto p-0 text-light" onClick={showAddModal}>
          +
        </Button>
      </div>
      <ListGroup varitant="flush">
        {channels.map(({ id, name }) => {
          const btnClass = cn({
            'w-100 text-left px-3 text-light bg-secondary border-0 rounded-0': true,
            'bg-info ': id === currentChannel.id,
          });
          return (
            <ListGroup.Item key={id} className="border-0 p-0">
              <Button variant="link" className={btnClass} onClick={changeCurrentChannel(id)}>
                {`#${name}`}
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default connect(mapStateToProps, mapDispatch)(Channels);
