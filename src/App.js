import React from 'react';
import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert } from './components/Alert';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
	const [eventNumber, setEventNumber] = useState(32);
	const [events, setEvents] = useState([]);
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');
	const [infoAlert, setInfoAlert] = useState('');

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
			<div className='alerts-container'>
				{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
			</div>
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>
			<NumberOfEvents eventNumber={eventNumber} onEventNumberChange={handleEventNumberChange} />
			<EventList events={events} />
		</div>
	);
};

export default App;
