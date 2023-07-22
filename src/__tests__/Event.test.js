import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { extractLocations, getEvents } from '../api';

const allEvents = async () => await getEvents();
const event = allEvents([0]);

describe('<Event /> Component', () => {
	let EventComponent;
	beforeEach(() => {
		EventComponent = render(<Event event={event} />);
	});

	// Tests for rendering event information
	test('renders event title', () => {
		expect(screen.getByText(event.summary)).toBeInTheDocument();
	});

	test('renders event start time', () => {
		expect(screen.getByText(event.created)).toBeInTheDocument();
	});

	test('renders event location details', () => {
		expect(screen.getByText(event.location)).toBeInTheDocument();
	});

	test('renders event details button with the title (show details)', () => {
		expect(screen.getByText('show details')).toBeInTheDocument();
	});

	// Tests for showing and hiding event details
	test("by default, event's details section should be hidden", () => {
		expect(screen.getByText('hide details').not.toBeInTheDocument());
	});

	test("show the details section when the user clicks on the 'show details' button", async () => {
		const user = userEvent.setup();
		const showDetailsButton = screen.getByText('show details');
		await user.click(showDetailsButton);
		expect(screen.getByText('hide details').toBeInTheDocument());
	});

	test("hides the details section when the user clicks on the 'hide details' button", async () => {
		const user = userEvent.setup();
		const hideDetailsButton = screen.getByText('hide details');
		await user.click(hideDetailsButton);
		expect(screen.getByText('show details').toBeInTheDocument());
	});
});
