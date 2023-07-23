// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import NumberOfEvents from '../components/NumberOfEvents';

// describe('<NumberOfEvents /> component', () => {
// 	beforeEach(() => {
// 		render(<NumberOfEvents eventNumber={32} />);
// 	});

// 	test('NumberOfEvents component contains an element with the role of the textbox', () => {
// 		expect(screen.getByRole('textbox')).toBeInTheDocument();
// 	});

// 	test('ensure that the default value of the input field is 32', () => {
// 		const textBox = screen.findByPlaceholderText('Enter a number');
// 		expect(textBox).toHaveValue('32');
// 	});

// 	test('ensure components value changes when a change in input is typed', async () => {
// 		const user = userEvent.setup();
// 		const numberTextBox = screen.findByPlaceholderText('Enter a number');
// 		await user.type(numberTextBox, '{backspace}{backspace}10');
// 		expect(numberTextBox).toHaveValue('10');
// 	});
// });
