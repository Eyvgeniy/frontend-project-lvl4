import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { addChannel, changeChannel } from './channelsSlice';

const mapStateToProps = (state) => {
	const {
		currentChannelId,
		channels: { byId, allIds },
	} = state;
	const channels = allIds.map((id) => byId[id]);
	return { channels, currentChannelId };
};

const mapDispatch = { addChannel, changeChannel };

const Channels = ({ channels, changeChannel }) => {
	const dispatch = useDispatch();

	const changeCurrentChannel = (id) => (e) => {
		e.preventDefault();
		dispatch(changeChannel({ id }));
	};

	return (
		<>
			<p>
				<b>Channels List</b>
			</p>
			<ul className='list-unstyled'>
				{channels.map(({ id, name }) => (
					<li key={id}>
						<a href='#' onClick={changeCurrentChannel(id)}>
							<b>{name}</b>
						</a>
					</li>
				))}
			</ul>
		</>
	);
};
export default connect(mapStateToProps, mapDispatch)(Channels);
