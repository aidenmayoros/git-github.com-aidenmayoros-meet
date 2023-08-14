import React from 'react';
import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert } from './components/Alert';
import { extractLocations, getEvents } from './api';
import { ThreeCircles } from 'react-loader-spinner';

import './App.css';

const App = () => {
	const [eventNumber, setEventNumber] = useState(32);
	const [events, setEvents] = useState([]);
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');
	const [infoAlert, setInfoAlert] = useState('');
	const [errorAlert, setErrorAlert] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const handleEventNumberChange = (value) => {
		setEventNumber(value);
	};

	const fetchData = async () => {
		try {
			const allEvents = await getEvents();
			const filteredEvents =
				currentCity === 'See all cities'
					? allEvents
					: allEvents.filter((event) => event.location === currentCity);

			setEvents(filteredEvents.slice(0, eventNumber));
			setAllLocations(extractLocations(allEvents));
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [currentCity, eventNumber]);

	return (
		<div className='App'>
			<div className='alerts-container'>
				{infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
				{errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
			</div>
			<CitySearch
				allLocations={allLocations}
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>
			<NumberOfEvents
				eventNumber={eventNumber}
				onEventNumberChange={handleEventNumberChange}
				setErrorAlert={setErrorAlert}
			/>
			{isLoading ? (
				<div className='loading-spinner'>
					<ThreeCircles
						height='100'
						width='100'
						color='#57a4d6'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
						ariaLabel='three-circles-rotating'
						outerCircleColor=''
						innerCircleColor=''
						middleCircleColor=''
					/>
				</div>
			) : (
				<div>
					<EventList events={events} />
				</div>
			)}
		</div>
	);
};

export default App;
