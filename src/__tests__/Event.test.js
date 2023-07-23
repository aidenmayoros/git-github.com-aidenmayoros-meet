import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { getEvents } from '../api';

describe('<Event /> Component', () => {
	beforeEach(async () => {
		const allEvents = await getEvents();
		render(<Event event={allEvents[0]} />);
	});

	// // Tests for rendering event information
	test('renders event title', async () => {
		const allEvents = await getEvents();
		expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();
	});

	test('renders event start time', async () => {
		const allEvents = await getEvents();
		expect(screen.getByText(allEvents[0].created)).toBeInTheDocument();
	});

	test('renders event location details', async () => {
		const allEvents = await getEvents();
		expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
	});

	test('renders event details button with the title (show details)', async () => {
		expect(screen.queryByText('Show Details')).toBeInTheDocument();
	});

	// Tests for showing and hiding event details
	test("by default, event's details section should be hidden", async () => {
		expect(screen.queryByText('Hide Details')).not.toBeInTheDocument();
	});

	test("show the details section when the user clicks on the 'show details' button", async () => {
		const user = userEvent.setup();
		const showDetailsButton = screen.queryByText('Show Details');
		await user.click(showDetailsButton);
		expect(screen.getByText('Hide Details').toBeInTheDocument());
	});

	// test("hides the details section when the user clicks on the 'hide details' button", async () => {
	// 	const user = userEvent.setup();
	// 	const hideDetailsButton = screen.getByText('Hide Details');
	// 	await user.click(hideDetailsButton);
	// 	expect(screen.getByText('show details').toBeInTheDocument());
	// });
});
