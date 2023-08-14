import React from 'react';

const NumberOfEvents = ({ eventNumber, onEventNumberChange, setErrorAlert, onApplyclick }) => {
	const handleInputChanged = (value) => {
		let infoText;
		if (value < 0 || value.includes('.')) {
			infoText = 'Number of Events must be a positive number';
		} else {
			infoText = '';
			onEventNumberChange(value);
		}

		setErrorAlert(infoText);
	};

	return (
		<div className='number-of-events-container'>
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
			<button className='apply-button' onClick={onApplyclick}>
				<span>Apply</span>
			</button>
		</div>
	);
};

export default NumberOfEvents;
