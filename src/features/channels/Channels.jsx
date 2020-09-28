import React from 'react';
import { ListGroup, Button, Nav } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import cn from 'classnames';
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
			<div className='d-flex px-3'>
				<span>
					<b>Channels</b>
				</span>
				{/* <button type="button" className="btn btn-link mr-1 ml-auto p-0" onClick={showAddModal}>
          +
        </button> */}
				<Button variant='link' className='ml-auto p-0 text-light' onClick={showAddModal}>
					+
				</Button>
			</div>
			<ListGroup varitant='flush'>
				{channels.map(({ id, name }) => {
					const btnClass = cn({
						'w-100 text-left px-3 text-light bg-secondary border-0 rounded-0': true,
						'bg-info ': id === currentChannel.id,
					});
					return (
						<ListGroup.Item key={id} className='border-0 p-0'>
							<Button variant='link' className={btnClass} onClick={changeCurrentChannel(id)}>
								{`#${name}`}
							</Button>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
			{/* {currentChannel.removable ? (
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
      ) : null} */}
		</>
	);
};
export default connect(mapStateToProps, mapDispatch)(Channels);
