import { loadFeature, defineFeature } from 'jest-cucumber';
import { screen, render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
	test('When user hasn’t searched for a city, show upcoming events from all cities.', ({
		given,
		when,
		then,
	}) => {
		given('user hasn’t searched for any city', () => {});

		when('the user opens the app', async () => {
			await render(<App />);
		});

		then('the user should see the list of all upcoming events.', async () => {
			await waitFor(() => {
				const EventList = screen.queryByTestId('event-list');
				const EventListItems = within(EventList).queryAllByRole('listitem');
				expect(EventListItems.length).toBe(32);
			});
		});
	});

	test('User should see a list of suggestions when they search for a city.', ({
		given,
		when,
		then,
	}) => {
		given('the main page is open', () => {
			render(<App />);
		});

		when('user starts typing in the city textbox', async () => {
			const user = userEvent.setup();
			const CitySearch = screen.queryByTestId('city-search');
			const citySearchInput = within(CitySearch).queryByRole('textbox');
			await user.type(citySearchInput, 'Berlin');
		});

		then(
			'the user should recieve a list of cities (suggestions) that match what they’ve typed',
			async () => {
				const CitySearch = screen.queryByTestId('city-search');
				const suggestionListItems = within(CitySearch).queryAllByRole('listitem');
				expect(suggestionListItems).toHaveLength(2);
			}
		);
	});

	test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
		given('user was typing “Berlin” in the city textbox', async () => {
			render(<App />);
			const user = userEvent.setup();
			const CitySearch = screen.queryByTestId('city-search');
			const citySearchInput = within(CitySearch).queryByRole('textbox');
			await user.type(citySearchInput, 'Berlin');
		});

		and('the list of suggested cities is showing', () => {
			const CitySearch = screen.queryByTestId('city-search');
			const suggestionListItems = within(CitySearch).queryAllByRole('listitem');
			expect(suggestionListItems).toHaveLength(2);
		});

		when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
			const user = userEvent.setup();
			const CitySearch = screen.queryByTestId('city-search');
			const suggestionListItems = within(CitySearch).queryAllByRole('listitem');
			await user.click(suggestionListItems[0]);
		});

		then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
			const CitySearch = screen.queryByTestId('city-search');
			const citySearchInput = within(CitySearch).queryByRole('textbox');
			expect(citySearchInput).toHaveValue('Berlin, Germany');
		});

		and('the user should receive a list of upcoming events in that city', async () => {
			const CitySearch = screen.queryByTestId('city-search');
			const citySearchInput = within(CitySearch).queryByRole('textbox');
			const EventList = screen.queryByTestId('event-list');
			const EventListItems = within(EventList).queryAllByRole('listitem');
			const allEvents = await getEvents();

			// filtering the list of all events down to events located in Germany
			const berlinEvents = allEvents.filter((event) => event.location === citySearchInput.value);
			expect(EventListItems).toHaveLength(berlinEvents.length);
		});
	});
});
