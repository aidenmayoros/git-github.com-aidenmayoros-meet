import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { getEvents } from '../api';

// Insert the following to have a GUI of the testing
// screen.logTestingPlaygroundURL()
describe('<Event /> Component', () => {
	beforeEach(async () => {
		const allEvents = await getEvents();
		render(<Event event={allEvents[0]} />);
	});

	test('renders events title, start time, and location details', async () => {
		const allEvents = await getEvents();
		expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();
		expect(screen.getByText(allEvents[0].created)).toBeInTheDocument();
		expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
	});

	test("show / hide the details section when the user clicks on the 'show details' or 'hide details' button", async () => {
		const user = userEvent.setup();
		// Pre user click event tests
		expect(screen.queryByText('Show Details')).toBeInTheDocument();
		expect(screen.queryByText('Hide Details')).not.toBeInTheDocument();
		expect(screen.queryByTestId('event-description')).not.toBeInTheDocument();

		// User clicks show details button event
		const showDetailsButton = screen.queryByText('Show Details');
		await user.click(showDetailsButton);

		// Post user click event tests
		expect(screen.queryByText('Hide Details')).toBeInTheDocument();
		expect(screen.queryByTestId('event-description')).toBeInTheDocument();
		expect(screen.queryByText('Show Details')).not.toBeInTheDocument();
	});
});
