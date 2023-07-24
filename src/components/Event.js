import { useState } from 'react';

const Event = ({ event }) => {
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
				{showDetails && (
					<div data-testid='event-description' className='event-description'>
						{event.description}
					</div>
				)}
				<button className='event-details-btn' onClick={toggleDetails}>
					{showDetails ? 'Hide Details' : 'Show Details'}
				</button>
			</div>
		</li>
	);
};

export default Event;
