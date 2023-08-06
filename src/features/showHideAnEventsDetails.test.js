import { loadFeature, defineFeature } from 'jest-cucumber';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import dayjs from 'dayjs';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

// screen.logTestingPlaygroundURL();
defineFeature(feature, (test) => {
	beforeEach(async () => {
		const allEvents = await getEvents();
		render(<Event event={allEvents[0]} />);
	});

	test('When the user opens the app the event details should be hidden and the show details button should be visable.', ({
		given,
		when,
		then,
	}) => {
		given('user visits the app', () => {});

		when('user opens the app', () => {});

		then('user should see the events', async () => {
			const allEvents = await getEvents();
			const eventDate = dayjs(allEvents[0].created).format('MM/DD/YYYY h:mm A');
			const showDetailsButton = screen.getByText('Show Details');

			expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();
			expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
			expect(screen.getByText(eventDate)).toBeInTheDocument();
			expect(showDetailsButton).toBeInTheDocument();
		});
	});

	test('When the user clicks on an events show details button they should see the event description.', ({
		given,
		when,
		then,
		and,
	}) => {
		given('user opens the app', () => {});

		when('user clicks on show details button', async () => {
			const user = userEvent.setup();
			const showDetailsButton = screen.queryByText('Show Details');
			await user.click(showDetailsButton);
		});

		then('event detils description appears', () => {
			expect(screen.queryByTestId('event-description')).toBeInTheDocument();
		});

		and('hide details button is visable', () => {
			expect(screen.queryByText('Hide Details')).toBeInTheDocument();
			expect(screen.queryByText('Show Details')).not.toBeInTheDocument();
		});
	});

	test('When the user clicks on an events hide details button they should not be able to see the event description.', ({
		given,
		and,
		when,
		then,
	}) => {
		given('user has opened the app', () => {});

		and('has clicked on an events show details button', async () => {
			const user = userEvent.setup();
			const showDetailsButton = screen.queryByText('Show Details');
			await user.click(showDetailsButton);

			expect(screen.queryByText('Hide Details')).toBeInTheDocument();
			expect(screen.queryByText('Show Details')).not.toBeInTheDocument();
		});

		when('user clicks on event hide details button', async () => {
			const user = userEvent.setup();
			const hideDetailsButton = screen.queryByText('Hide Details');
			await user.click(hideDetailsButton);
		});

		then('event details should be hidden', () => {
			expect(screen.queryByTestId('event-description')).not.toBeInTheDocument();
			expect(screen.queryByText('Hide Details')).not.toBeInTheDocument();
		});

		and('show details button should be visable', () => {
			expect(screen.queryByText('Show Details')).toBeInTheDocument();
		});
	});
});
