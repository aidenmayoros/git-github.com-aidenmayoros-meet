import React from 'react';

const NumberOfEvents = ({ eventNumber, onEventNumberChange, setErrorAlert }) => {
	const handleInputChanged = (value) => {
		let infoText;
		if (value < 0 || isNaN(value) || value.includes('.')) {
			infoText = 'Number of Events must be a positive number';
			onEventNumberChange(32);
		} else {
			infoText = '';
			onEventNumberChange(value);
		}

		setErrorAlert(infoText);
	};

	return (
		<div>
			<label htmlFor='number-of-events-input' id='number-of-events-input-label'>
				Number of Events:
			</label>
			<input
				data-testid='number-of-events-input'
				id='number-of-events-input'
				name='number-of-events-input'
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
