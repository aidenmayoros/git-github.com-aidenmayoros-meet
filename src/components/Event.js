import { useState } from 'react';
import dayjs from 'dayjs';

const Event = ({ event }) => {
	const [showDetails, setShowDetails] = useState(false);
	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const eventDate = dayjs(event.created).format('MM/DD/YYYY h:mm A');

	return (
		<li>
			<div className='event'>
				<h2>{event.summary}</h2>
				<div className='event-location'>{event.location} </div>
				<div className='event-dateTime'>{eventDate}</div>
				{showDetails && (
					<div data-testid='event-description' className='event-description'>
						{event.description}
					</div>
				)}
				<button className='event-details-btn' onClick={toggleDetails}>
					<span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
				</button>
			</div>
		</li>
	);
};

export default Event;
