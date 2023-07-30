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
	const [currentCity, setCurrentCity] = useState('See all cities');

	const handleEventNumberChange = (value) => {
		setEventNumber(value);
	};

	const fetchData = async () => {
		const allEvents = await getEvents();
		const filteredEvents =
			currentCity === 'See all cities'
				? allEvents
				: allEvents.filter((event) => event.location === currentCity);
		setEvents(filteredEvents.slice(0, eventNumber));
		setAllLocations(extractLocations(allEvents));
	};

	useEffect(() => {
		fetchData();
	}, [currentCity, eventNumber]);

	return (
		<div className='App'>
			<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
			<NumberOfEvents eventNumber={eventNumber} onEventNumberChange={handleEventNumberChange} />
			<EventList events={events} />
		</div>
	);
};

export default App;
