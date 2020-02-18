import React from 'react';
import { useContext } from 'react';
import UserContext from '../../UserContext';

const Message = (props) => {
	const {
		message: { text, user, time },
	} = props;

	return (
		<li>
			<span>
				{user} {time}
			</span>
			<p>{text}</p>
		</li>
	);
};

export default Message;
