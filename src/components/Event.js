import { useState } from 'react';

export default Event = ({ event }) => {
	const [showDetails, setShowDetails] = useState(false);
	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	return (
		<li>
			<div className='event'>
				<h2>{event.summary}</h2>
				<div className='event-location'>{event.location} </div>
				<div className='event-dateTime'>{event.created}</div>
				{showDetails && <div className='event-description'>{event.description}</div>}
				<button className='event-details-btn' onClick={toggleDetails}>
					{showDetails ? 'Hide Details' : 'Show Details'}
				</button>
			</div>
		</li>
	);
};
