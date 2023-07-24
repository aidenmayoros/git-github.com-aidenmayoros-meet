import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

// Insert the following to have a GUI of the testing
// screen.logTestingPlaygroundURL()
describe('<NumberOfEvents /> component', () => {
	test('NumberOfEvents component textbox is rendered and has default value of 32', () => {
		render(<NumberOfEvents eventNumber={32} />);
		const numberTextBox = screen.getByRole('textbox');
		expect(numberTextBox).toBeInTheDocument();
		expect(numberTextBox).toHaveValue('32');
	});

	test('ensure components value change function is called when a change in input is typed', async () => {
		const user = userEvent.setup();

		// Function to use as placeholder of state change call back function
		const handleEventNumberChange = jest.fn();

		render(<NumberOfEvents eventNumber={32} onEventNumberChange={handleEventNumberChange} />);
		const numberTextBox = screen.getByRole('textbox');
		await user.type(numberTextBox, '{backspace}{backspace}10');
		expect(handleEventNumberChange).toHaveBeenCalled();
	});
});
