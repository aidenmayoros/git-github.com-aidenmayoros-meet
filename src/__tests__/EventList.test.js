import { render, within, waitFor, screen } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component unit tests', () => {
	beforeEach(() => {
		render(<EventList />);
	});

	test('has an element with "list" role', () => {
		expect(screen.getByRole('list')).toBeInTheDocument();
	});

	test('renders correct number of events', async () => {
		const allEvents = await getEvents();
		const { rerender } = await render(<EventList events={allEvents} />);
		await rerender(<EventList events={allEvents} />);
		expect(screen.getAllByRole('listitem')).toHaveLength(allEvents.length);
	});
});

describe('<EventList /> integration tests', () => {
	test('renders a list of 32 events when the app is mounted and rendered', async () => {
		render(<App />);
		const EventListElement = screen.getByTestId('event-list');
		await waitFor(() => {
			const EventListItems = within(EventListElement).queryAllByRole('listitem');
			expect(EventListItems.length).toBe(32);
		});
	});
});
