import { render, within, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

// screen.logTestingPlaygroundURL();
describe('<App /> component unit tests to make sure the child components render', () => {
	beforeEach(async () => {
		await render(<App />);
	});

	test('render list of events', async () => {
		await waitFor(() => expect(screen.getByTestId('event-list')).toBeInTheDocument());
	});

	test('render <NumberofEvents /> component', () => {
		expect(screen.getByTestId('number-of-events-input')).toBeInTheDocument();
	});

	test('render CitySearch', () => {
		expect(screen.getByTestId('city-search')).toBeInTheDocument();
	});
});

describe('<App /> integration tests', () => {
	test('render a list of events matching the city selected by the user', async () => {
		await render(<App />);
		const user = userEvent.setup();

		const CitySearchElement = screen.getByTestId('city-search');
		const CitySearchInput = within(CitySearchElement).queryByRole('textbox');

		await user.type(CitySearchInput, 'Berlin');
		const berlinSuggestionItem = within(CitySearchElement).queryByText('Berlin, Germany');
		await user.click(berlinSuggestionItem);

		const EventListElement = screen.getByTestId('event-list');
		const allRenderedEventItems = within(EventListElement).queryAllByRole('listitem');

		const allEvents = await getEvents();
		const berlinEvents = allEvents.filter((event) => event.location === 'Berlin, Germany');

		expect(allRenderedEventItems.length).toBe(berlinEvents.length);
		allRenderedEventItems.forEach((event) => {
			expect(event.textContent).toContain('Berlin, Germany');
		});
	});

	test('render the amount of events a user specifies in <NumberOfEvents /> component', async () => {
		const user = userEvent.setup();
		await render(<App />);

		// Default input field value test
		const NumberOfEventsInput = screen.queryByTestId('number-of-events-input');
		expect(NumberOfEventsInput).toHaveValue(32);
		expect(NumberOfEventsInput).toHaveClass('textbox');

		// Make sure all events are rendered as App is opened
		await waitFor(() => {
			const allRenderedEvents = screen.queryByTestId('event-list');
			expect(allRenderedEvents).toBeInTheDocument();
		});

		// User changes amount of events
		await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
		expect(NumberOfEventsInput).toHaveValue(10);
		const applyButton = screen.queryByTestId('apply-button');
		fireEvent.click(applyButton);
		await waitFor(() =>
			expect(within(screen.queryByTestId('event-list')).queryAllByRole('listitem').length).toBe(10)
		);
	});
});
