import React from 'react';

const NumberOfEvents = ({ eventNumber, onEventNumberChange }) => {
	const handleInputChanged = (value) => {
		const numberValue = parseInt(value);
		if (typeof numberValue == 'number') {
			onEventNumberChange(numberValue);
		} else {
			onEventNumberChange(0);
		}
	};

	return (
		<div id='number-of-events-textbox'>
			<input
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
