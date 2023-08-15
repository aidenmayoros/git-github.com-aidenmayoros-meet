import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// screen.logTestingPlaygroundURL();
defineFeature(feature, (test) => {
	beforeEach(() => {
		render(<App />);
	});

	test('When the user opens the app there should be 32 events shown by default', ({
		given,
		when,
		then,
	}) => {
		given('the app is open', () => {});

		when('the user has not changed the number of events', () => {});

		then('there should be 32 events displayed in the event lsit', async () => {
			const numberTextBox = screen.queryByTestId('number-of-events-input');
			expect(numberTextBox).toHaveValue(32);

			await waitFor(() => {
				const eventList = screen.getAllByRole('listitem');
				expect(eventList).toHaveLength(32);
			});
		});
	});

	test('User can change the number of events', ({ given, when, then }) => {
		given('the app is open and shows 32 events', async () => {
			const numberTextBox = screen.queryByTestId('number-of-events-input');
			expect(numberTextBox).toHaveValue(32);

			await waitFor(() => {
				const eventList = screen.getAllByRole('listitem');
				expect(eventList).toHaveLength(32);
			});
		});

		when(
			'the user removes the number 32 from the input field and clicks the apply button',
			async () => {
				const numberTextBox = screen.queryByTestId('number-of-events-input');
				const applyButton = screen.queryByTestId('apply-button');
				fireEvent.change(numberTextBox, { target: { value: '' } });
				fireEvent.click(applyButton);
			}
		);

		then('all events should no longer be displayed', async () => {
			const numberTextBox = screen.queryByTestId('number-of-events-input');
			await waitFor(() => {
				expect(numberTextBox.value).toBe('');
			});
		});

		when('the user enters 5', () => {
			const numberTextBox = screen.queryByTestId('number-of-events-input');
			const applyButton = screen.queryByTestId('apply-button');
			fireEvent.change(numberTextBox, { target: { value: '5' } });
			fireEvent.click(applyButton);
		});

		then('five events should be displayed', async () => {
			await waitFor(() => {
				const eventList = screen.getAllByRole('listitem');
				expect(eventList).toHaveLength(5);
			});
		});
	});
});
