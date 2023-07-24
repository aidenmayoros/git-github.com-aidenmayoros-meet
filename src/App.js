import React from 'react';
import { useState } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
	const [eventNumber, setEventNumber] = useState(32);

	const handleEventNumberChange = (value) => {
		setEventNumber(value);
	};

	return (
		<div className='App'>
			<CitySearch />
			<NumberOfEvents eventNumber={eventNumber} onEventNumberChange={handleEventNumberChange} />
			<EventList />
		</div>
	);
};

export default App;
