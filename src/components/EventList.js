import Event from './Event';

const EventList = ({ events }) => {
	return (
		<ul data-testid='event-list' id='event-list'>
			{events ? events.map((event) => <Event key={event.id} event={event} />) : null}
		</ul>
	);
};

export default EventList;
