import React from 'react';

const NumberOfEvents = ({ eventNumber, onEventNumberChange }) => {
	const handleInputChanged = (value) => {
		onEventNumberChange(value);
	};

	return (
		<div>
			<input
				data-testid='number-of-events-input'
				id='number-of-events-input'
				type='number'
				className='textbox'
				placeholder='Enter a number'
				value={eventNumber}
				onChange={(e) => handleInputChanged(e.target.value)}
			/>
		</div>
	);
};

export default NumberOfEvents;
