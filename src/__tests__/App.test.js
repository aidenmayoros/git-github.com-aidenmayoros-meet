import { render, within, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

// screen.logTestingPlaygroundURL();
describe('<App /> component unit tests to make sure the child components render', () => {
	let AppDOM;
	beforeEach(() => {
		AppDOM = render(<App />).container.firstChild;
	});

	test('render list of events', () => {
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});

	test('render <NumberofEvents /> component', () => {
		expect(AppDOM.querySelector('#number-of-events-input')).toBeInTheDocument();
	});

	test('render CitySearch', () => {
		expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
	});
});

describe('<App /> integration tests', () => {
	test('render a list of events matching the city selected by the user', async () => {
		const user = userEvent.setup();
		const AppComponent = render(<App />);
		const AppDOM = AppComponent.container.firstChild;

		const CitySearchDOM = AppDOM.querySelector('#city-search');
		const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

		await user.type(CitySearchInput, 'Berlin');
		const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
		await user.click(berlinSuggestionItem);

		const EventListDOM = AppDOM.querySelector('#event-list');
		const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

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
		const allRenderedEvents = screen.queryByTestId('event-list');
		await waitFor(() => expect(allRenderedEvents).toBeInTheDocument());

		// User changes amount of events
		await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
		expect(NumberOfEventsInput).toHaveValue(10);
		expect(within(allRenderedEvents).queryAllByRole('listitem').length).toBe(10);
	});
});
