import React from 'react';
import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
	const [eventNumber, setEventNumber] = useState(32);
	const [events, setEvents] = useState([]);
	const [allLocations, setAllLocations] = useState([]);

	const handleEventNumberChange = (value) => {
		setEventNumber(value);
	};

	const fetchData = async () => {
		const allEvents = await getEvents();
		setEvents(allEvents.slice(0, eventNumber));
		setAllLocations(extractLocations(allEvents));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='App'>
			<CitySearch allLocations={allLocations} />
			<NumberOfEvents eventNumber={eventNumber} onEventNumberChange={handleEventNumberChange} />
			<EventList events={events} />
		</div>
	);
};

export default App;
